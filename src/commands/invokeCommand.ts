import { invoke } from "@tauri-apps/api";
import { InvokeArgs } from "@tauri-apps/api/tauri";

export type BaseCommand<N extends string, A extends InvokeArgs, R> = {
  name: N;
  args: A;
  res: R;
};

type N = "name";
type A = "args";
type R = "res";

type CommandResult<T> = {
  data: T;
};

type CommandError = {
  message: string;
};

export type CommandResponse<T> =
  | { error: null; result: CommandResult<T> }
  | { error: CommandError; result: null };

const invokeCommand = async <
  T extends BaseCommand<string, InvokeArgs, unknown>,
>(
  command: T[N],
  args: T[A],
): Promise<T[R]> => {
  try {
    const res: CommandResponse<T[R]> = await invoke(command, args);
    if (res.error !== null) {
      throw new Error(res.error.message);
    } else {
      return res.result.data;
    }
  } catch (err) {
    throw new Error("Incorrect or unimplemented command");
  }
};

export default invokeCommand;

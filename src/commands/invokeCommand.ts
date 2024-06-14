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
): Promise<CommandResponse<T[R]>> => {
  return invoke(command, args);
};

export default invokeCommand;

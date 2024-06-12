import { invoke } from "@tauri-apps/api";
import { InvokeArgs } from "@tauri-apps/api/tauri";

export type BaseCommand<
  N extends string,
  A extends InvokeArgs,
  R extends any
> = {
  name: N;
  args: A;
  res: R;
};

type N = "name";
type A = "args";
type R = "res";

const invokeCommand = async <T extends BaseCommand<string, InvokeArgs, any>>(
  command: T[N],
  args: T[A]
): Promise<T[R]> => {
  return await invoke(command, args);
};

export default invokeCommand;

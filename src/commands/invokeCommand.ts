import { invoke } from "@tauri-apps/api";
import { InvokeArgs } from "@tauri-apps/api/tauri";

type BaseCommand = {
  name: string;
  args: InvokeArgs;
  res: any;
};

type N = "name";
type A = "args";
type R = "res";

const invokeCommand = async <T extends BaseCommand>(
  command: T[N],
  args: T[A]
): Promise<T[R]> => {
  return await invoke(command, args);
};

export default invokeCommand;

export async function msleep(time: number): Promise<void> {
    return new Promise(resolve => setTimeout(_ => resolve(), time));
}

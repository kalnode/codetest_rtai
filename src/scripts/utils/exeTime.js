export default async function exeTime (promise, timeMin) {
  return await Promise.all([promise, new Promise(resolve => setTimeout(resolve, timeMin))])
}

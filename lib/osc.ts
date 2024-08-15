export function getMachineName(ipAddress: string | null) {
  if (ipAddress === null) {
    return "Unknown";
  }
  let machineName = "Unknown";
  switch (ipAddress) {
    case "127.0.0.1": {
      machineName = "Localhost";
      break;
    }
  }
  return machineName;
}

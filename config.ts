const getEnvironmentVariable = (environmentVariable: string): string => {
    const unvalidatedEnvironmentVariable = process.env[environmentVariable];
    if (!unvalidatedEnvironmentVariable) {
      throw new Error(
        `Couldn't find environment variable: ${environmentVariable}`
      );
    } else {
      return unvalidatedEnvironmentVariable;
    }
  };
  
  export const configFeApi = {
    apiKey: getEnvironmentVariable("FE_API")
  };

  export const configBeApi = {
    apiKey: getEnvironmentVariable("BE_API")
  };
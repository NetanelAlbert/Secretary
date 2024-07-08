import { SecretsManagerClient, GetSecretValueCommand, GetSecretValueCommandOutput } from "@aws-sdk/client-secrets-manager";
import { MySecret } from "./models";

const client = new SecretsManagerClient({
  region: "eu-west-1",
});

const secretName = 'Secretary';

export async function getSecret(): Promise<MySecret> {
  let response: GetSecretValueCommandOutput;

  try {
    response = await client.send(
      new GetSecretValueCommand({
        SecretId: secretName,
        VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
      })
    );
  } catch (error) {
    // For a list of exceptions thrown, see
    // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    throw error;
  }

  if (!response.SecretString) {
    throw new Error("Secret string is undefined");
  }

  // Assuming the secret string is JSON formatted
  const secret: MySecret = JSON.parse(response.SecretString);
  return secret;
}
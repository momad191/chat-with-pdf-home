import { Email } from "@/model/email-model";

export async function createEmail(email) {
  try {
    await Email.create(email);
  } catch (e) {
    throw new Error(e);
  }
}

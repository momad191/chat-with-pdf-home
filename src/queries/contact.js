import { Contact } from "@/model/contact-model";

export async function createContact(contact) {
  try{
    await Contact.create(contact);
  } catch(e){
    throw new Error(e)
  }
}
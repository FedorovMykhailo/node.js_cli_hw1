import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';


const file = path.resolve("db","contacts.json")

//const  = './db/contacts.json'

export const listContacts = async () => {
    const data = await fs.readFile(file)
  // ...твій код. Повертає масив контактів.
    return JSON.parse(data)
}

export const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const contact = contacts.find(({ id }) => id === contactId)
    return contact || null
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
}

export const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(({ id }) => id === contactId)
    if (contactIndex === -1) { return null }
    const [contact] = contacts.splice(contactIndex, 1)
    await fs.writeFile(file, JSON.stringify(contacts,null,2))
    return contact
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
}

export const addContact = async (name, email, phone) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    };
    contacts.push(newContact);
    await fs.writeFile(file, JSON.stringify(contacts,null,2))
    return newContact
  // ...твій код. Повертає об'єкт доданого контакту. 
}
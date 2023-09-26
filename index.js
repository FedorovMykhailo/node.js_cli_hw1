import { listContacts, getContactById, removeContact, addContact } from "./contacts.js";
import { program } from 'commander';

program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

program.parse(process.argv)
    
const option = program.opts()

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case 'list':
            const contactList = await listContacts()
            return console.table(contactList);;
        case 'get':
            const getContact = await getContactById(id)
            return console.log(getContact);;
        case 'add':
            const addedContact = await addContact(name,email,phone)
            return console.log(addedContact);
        case 'remove':
            const removedContact = await removeContact(id) 
            return console.log(removedContact);;
        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}
invokeAction(option);
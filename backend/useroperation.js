import { getDB } from './mongo-context.js';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
const collectionName = "users";

// CREATE
export async function createUser(user) {
  try {
    const id = await getLatestUserId();
    user.id = id;
    user.password = await bcrypt.hash(user.password, 10);
    const result = await getDB().collection(collectionName).insertOne(user);
    if (result.acknowledged) {
      const insertedUser = await getDB().collection(collectionName).findOne({ _id: result.insertedId });
      return { user: insertedUser };
    } else {
      throw new Error('Insert failed');
    }
  } catch (err) {
    console.error('Create error:', err);
    throw err;
  }
}
  
// READ ALL
  export async function getAllUser() {
    try {
      const users = await getDB().collection(collectionName).find({}).toArray();
      return users;
    } catch (err) {
      console.error('Read all error:', err);
    }
  }

  // latest id
  export async function getLatestUserId() {
    try {
      const user = await getDB().collection(collectionName).find().sort({id : -1}).limit(1).toArray();
      const nextId = user.length > 0 ? user[0].id + 1 : 5;
      return nextId;
    } catch (err) {
      console.error('Read all error:', err);
    }
  }
  
  // UPDATE
  export async function updateUser(user) {
    try {
      const result = await getDB().collection(collectionName).updateOne(
        { _id: new ObjectId(user.id) },
        {
         $set: {
          name: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: await bcrypt.hash(user.password, 10)
        },
        }
      );
      return result.modifiedCount;
    } catch (err) {
      console.error('Update error:', err);
      throw err;
    }
  }
  
  // DELETE
  export async function deleteUser(id) {
    try {
      const result = await getDB().collection(collectionName).deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount;
    } catch (err) {
      console.error('Delete error:', err);
      throw err;
    }
  }

//login
export async function loginUser(username, password) {
  try {
    const user = await getDB().collection(collectionName).findOne({ email:username });
    if ((user && !await bcrypt.compare(password, user.password)) || !user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error('Login error in useroperation:', error);
    throw error;
  }
}

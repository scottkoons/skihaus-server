import { MongoClient } from "mongodb";
import { Database, User, Listing, Booking } from "../lib/types";

// ***** use 'require' and useNewUrlParser: true and useUnifiedTopology: true work.
// const { MongoClient } = require('mongodb');
// import { Database } from "../lib/types";

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// This also works, but it does not specify the db:
// const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD
//   }@${process.env.DB_CLUSTER}.mongodb.net`;

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  });
  const db = client.db("main");

  return {
    //************ using a type variable. Does not work ********* */
    bookings: db.collection<Booking>("bookings"),
    listings: db.collection<Listing>("listings"),
    users: db.collection<User>("users")
    //*********************************************************** */

    // ***** Removing the type var works when using 'require' vs 'import' MongoClient, but this causes an error with useNewUrlParser: true and useUnifiedTopology: true *****

    // bookings: db.collection("bookings"),
    // listings: db.collection("listings"),
    // users: db.collection("users")
  };
};


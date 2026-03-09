export const MIGRATION_QUERY = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE IF NOT EXISTS users (
      user_id       UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
      email         VARCHAR(250)  NOT NULL UNIQUE,
      password_hash VARCHAR(255)  NOT NULL
    );

    CREATE TABLE IF NOT EXISTS tasks (
      task_id  UUID     PRIMARY KEY DEFAULT uuid_generate_v4(),
      content  TEXT     NOT NULL,
      status   BOOLEAN  DEFAULT FALSE,
      owner_id UUID     NOT NULL,

      CONSTRAINT fk_owner
        FOREIGN KEY (owner_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
    );`;

export const USER_QUERIES = {
  FIND_ALL: `select * from users`,
  FIND_BY_ID: `select * from users where user_id=$1`,
  FIND_BY_EMAIL: `select * from users where email=$1`,
  CREATE: `insert into users (email,password_hash) values($1,$2) RETURNING *`,
  DELETE: `delete from users where user_id=$1 RETURNING *`,
};
export const TASK_QUERIES = {
  FIND_ALL: `select * from tasks`,
  FIND_BY_ID: `select * from tasks where task_id=$1`,
  FIND_BY_OWNER: `select * from tasks where owner_id=$1`,
  CREATE: `insert into tasks (content,status,owner_id) values ($1,$2,$3) RETURNING *`,
  UPDATE_STATUS: `update tasks set status=$2 where task_id=$1 RETURNING *`,
  DELETE: `delete from tasks where task_id=$1 RETURNING *`,
  DELETE_COMPLETED: `delete from tasks where status=true and owner_id=$1`,
};

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const EMAILERRORS = {
  EMPTY: "Email is required.",
  INVALID: "Email must be a valid address, e.g., user@example.com.",
};

export const PASSWORDERRORS = {
  EMPTY: "Password is required.",
  TOOSHORT: "Password must be at least 8 characters long.",
  NOUPPERCASE: "Password must contain at least one uppercase letter.",
  NOLOWERCASE: "Password must contain at least one lowercase letter.",
  NONUMBER: "Password must contain at least one number.",
  NOSPECIALCHARACTER:
    "Password must contain at least one special character (@$!%*?&).",
};

// Error messages
export const TASKERRORS = {
  CONTENTEMPTY: "Task content cannot be empty.",
  STATUSINVALIDE: "Status must be true or false.",
};

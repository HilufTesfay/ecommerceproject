const bcrypt = require("bcryptjs");
// Define function to update createdAt and updatedAt fields
function recordTimeStamp(schema) {
  schema.pre("save", function (next) {
    const now = new Date();
    if (schema.options.schemaName === "customer") {
      this.updatedAt = now;
      if (!this.createdAt) {
        this.createdAt = now;
      }
    } else if (schema.options.schemaName === "product") {
      this.lastUpdated = now;
      if (!this.dateAdded) {
        this.dateAdded = now;
      }
    }
    next();
  });

  schema.pre("updateOne", function (next) {
    const now = new Date();
    if (schema.options.schemaName === "customer") {
      this.set({ updatedAt: now });
    } else if (schema.options.schemaName === "product") {
      this.set({ lastUpdated: now });
    }
    next();
  });

  schema.pre("findOneAndUpdate", function (next) {
    const now = new Date();
    if (schema.options.schemaName === "customer") {
      this.set({ updatedAt: now });
    } else if (schema.options.schemaName === "product") {
      this.set({ lastUpdated: now });
    }
    next();
  });

  schema.pre("updateMany", function (next) {
    const now = new Date();
    if (schema.options.schemaName === "customer") {
      this.set({ updatedAt: now });
    } else if (schema.options.schemaName === "product") {
      this.set({ lastUpdated: now });
    }
    next();
  });
}

// Define timestamp plugin
function timeStamp(schema, options) {
  if (options.schemaName === "customer" || options.schemaName === "admin") {
    schema.add({
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
    });
  } else if (options.schemaName === "product") {
    schema.add({
      dateAdded: {
        type: Date,
        default: Date.now,
      },
      lastUpdated: {
        type: Date,
        default: Date.now,
      },
    });
  }
  recordTimeStamp(schema);
}
//define function that deletes fields with private option
const deletePrivateField = function (obj, path, index) {
  delete obj[path[index]];
  return;
};
//define function to format the json
const toJSON = function (schema) {
  let transform = null;
  //if predined transform function exist store it in transform variable
  if (schema.options.toJSON && schema.options.toJSON.tansform) {
    transform = schema.options.toJSON.tansform;
  }
  //set toJSON  option with custom transform function
  schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
    transform(doc, ret, options) {
      Object.keys(schema.paths).forEach((path) => {
        if (schema.paths[path].options && schema.paths[path].options.private) {
          deletePrivateField(ret, path.split("."), 0);
        }
      });
      //removing fields
      delete ret.createdAt;
      delete ret.updatedAt;
      ret.id = ret._id.toString();
      delete ret.role;
      delete ret._id;
      delete ret.__v;

      //if predined transform function exist apply it too
      if (transform) {
        return transform(doc, ret, options);
      }
    },
  });
};
const addRole = function (schema, options) {
  if (options.schemaName === "customer") {
    schema.add({
      role: { type: String, default: "customer" },
    });
  } else if (options.schemaName === "admin") {
    schema.add({
      role: { type: String, default: "admin" },
    });
  }
};
//define function to hash password
const hashPassword = function (schema) {
  schema.pre("save", async function (next) {
    const user = this;
    try {
      // Check if the password field has been modified
      if (user.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    } catch (error) {
      return next(error);
    }
    next();
  });
};

//define instance function to verify password
const verifyPassword = function (schema) {
  schema.methods.verifyPassword = async function (password) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      throw new Error(error);
    }
  };
};
//define static method to check if email is used or not
const isEmailUsed = function (schema) {
  schema.statics.isEmailUsed = async function (CustomerEmail) {
    const customer = await this.findOne({ email: CustomerEmail });
    const isUsed = !!customer;
    return isUsed;
  };
};
//define static method to check if phone number is used or not
const isphoneNumberUsed = function (schema) {
  schema.statics.isphoneNumberUsed = async function (phoneNumber) {
    const customer = await this.findOne({ phoneNumber: phoneNumber });
    const isUsed = !!customer;
    return isUsed;
  };
};
module.exports = {
  timeStamp,
  toJSON,
  addRole,
  hashPassword,
  verifyPassword,
  isEmailUsed,
  isphoneNumberUsed,
};

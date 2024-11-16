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
  if (options.schemaName === "customer") {
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
const toJSON = function (schema, options) {
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
      delete ret._id;
      delete ret.__v;

      //if predined transform function exist apply it too
      if (transform) {
        return transform(doc, ret, options);
      }
    },
  });
};
module.exports = { timeStamp, toJSON };

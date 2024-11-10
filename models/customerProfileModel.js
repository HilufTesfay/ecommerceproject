
const { default: mongoose } = require("mongoose");

const profileSchcema = mongoose.Schema({
  image: {
    customer:{
        type:mongoose.Schema.Types.ObjectId;
        ref:"Customer"
    },
    type:Buffer
  },
});
const Profile = mongoose.model("Profile", profileSchcema);
module.exports = {
  Profile,
};

const mongoose = require("mongoose");

let memberSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      enum : ['Assistant Professor', 'Associate Professor', 'Dame', 'Dr', 'Lady', 'Lord', 'Miss', 'Mr', 'Mrs', 'Ms', 'Professor', 'Professor Dr', 'Professor Sir', 'Sir']
    },
    password: {
      type: String,
      required: true
    },
    fname: {
      type: String,
      required: [true, "please enter first name"],
    },
    lname: {
      type: String,
      required: [true, "please enter last name"],
    },
    dob: {
      type: String,
      required: [true, "please enter date of birth"],
    },
    gender : {
      type: String,
      required: [true, "please enter gender"],
      enum : ['Female', 'Male']
    },
    work_address_status: {
      type : Boolean,
      required: [true, "please select work address status"],
    },
    home_address: {
      type : String,
      required: function () { return this.work_address_status === false }
    },
    home_city : {
      type : String,
      required: function () { return this.work_address_status === false }
    },
    home_country : {
      type : String,
      required: function () { return this.work_address_status === false }
    },
    home_zip_code : {
      type : String,
      required: function () { return this.work_address_status === false }
    },
    company_name: {
      type : String,
      required: function () { return this.work_address_status }
    },
    work_department: {
      type : String,
      required: function () { return this.work_address_status }
    },
    work_address: {
      type : String,
      required: function () { return this.work_address_status }
    },
    work_city: {
      type : String,
      required: function () { return this.work_address_status }
    },
    work_country: {
      type : String,
      required: function () { return this.work_address_status }
    },
    work_zip_code: {
      type : String,
      required: function () { return this.work_address_status }
    },
    mailing_address_status: {
      type : Boolean,
      required: [true, "please select mailing address status"],
    },
    phone : {
      type : String,
      required: function(){ return this.mailing_address_status}
    },
    email : {
      type : String,
      required: function(){ return this.mailing_address_status}
    },
    home_address: {
      type : String,
      required: function(){ return this.mailing_address_status === false}
    },
    home_city : {
      type : String,
      required: function(){ return this.mailing_address_status === false}
    },
    home_country : {
      type : String,
      required: function(){ return this.mailing_address_status === false}
    },
    home_zip_code : {
      type : String,
      required: function(){ return this.mailing_address_status === false}
    },
    endocrine_networks : {
      type: [String],
      required: true,
      enum: ['Adrenal & Cardiovascular', 'Bone & Calcium', 'Endocrine Cancer', 'Endocrine Consequences of Living with and Beyond Cancer', 'Metabolic & Obesity', 'Neuroendocrinology', 'Reproductive Endocrinology & Biology', 'Thyroid']
    },
    info_plattform : {
      type: [String],
      required: true,
      enum : ['Email from SfE', 'Endocrine ambassador', 'Flyer/brochure/poster from SfE', 'Online advertisement in a journal/magazine or website', 'Print advertisement in a journal or magazine', 'Recommendation from a colleague', 'Recommendation through an affiliated society', 'Search engine', 'SfE stand at conference/training session', 'Social media', 'The Endocrinologist magazine']
    },
    membership_attraction : {
      type: [String],
      required: true,
      enum: ['Access to journals', 'Career support', 'Conferences/training sessions', 'Enhancing my CV', 'Grants/funding', 'Networking', 'News updates from the sector', 'Reputation of the Society', 'Support given to students']
    },
    membership_category: {
      type: String,
      required: true,
      enum : ['Clinical Academic', 'Clinician-in-Practice', 'Scientist', 'Nurse', 'Associated Professional']
    },
    membership_type : {
      type: String,
      required: true,
      enum : ['Full', 'Early Career', 'Student']
    },
    subscription_type : {
      type: String,
      required: true,
      enum : ['Annual Membership', 'Annual Concessionary Membership', 'Lifetime Membership']
    },
    society_official_journals : {
      type: [String],
      required: true,
      enum : ['Journal of Endocrinology', 'Journal of Molecular Endocrinology', ' Endocrine-Related Cancer', 'Reproduction (print + online)']
    },
    is_proposed_member : {
      type : Boolean,
      required: true,
    },
    accept_privacy_policy: {
      type : Boolean,
      required: true,
    },
    mailing_preference : {
      type: String,
      enum : ['General updates on SFE activities', 'Updates on SFE events', 'Industry news and promotional messages from SFE sponsors', 'News and content alerts from SfE journals', ' Endocrinology News', ' I do not want to receive any email communications from SFE'],
      validate: {
        validator: function (v) {
            return v.length === false
        },
        message: 'You must provide at least one mailing preference.'
    }
    },
    postal_email_status : {
      type : Boolean,
      required: true,
    },
    membership_directory_inclusion_status : {
      type : Boolean,
      required: true,
    },
    media_queries_contact_status : {
      type : Boolean,
      required: true,
    },
    payment_status : {
      type : Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

memberSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

memberSchema.set("toJSON", {
  virtuals: true,
});


const Member = mongoose.model("member", memberSchema);

module.exports = Member;
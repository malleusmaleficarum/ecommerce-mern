const router = require("express").Router();
const mailchimp = require("@mailchimp/mailchimp_marketing");

//add email to subslist
router.post("/subscribe", async (req, res) => {
  const listId = process.env.MAILCHIMP_LIST;
  const mcKey = process.env.MAILCHIMP_KEY;
  const { email } = req.body;

  mailchimp.setConfig({
    apiKey: mcKey,
    server: "us14",
  });

  try {
    const res = await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: "subscribed",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

const { prisma } = require("./api/api")

const name = "enkrypton";
const Avatar = (username) => `https://avatars.dicebear.com/api/adventurer/${username}.svg`;

const time = (timestamp) => {
  
  const dateConv = (diff) => Math.floor(diff / (86400000));
  let day, date = new Date(timestamp).getDay(), diff = Date.now() - timestamp;
  let ref = dateConv(diff);

  if(ref == 0){
    if(date == new Date().getDay()) day = "Today"
    else day = "Yesterday"
  }
  else if(ref == 1){
    if(date == new Date().getDay() + 1) day = "Yesterday"
    else day = "1 day ago"
  } 
  else day = `${ref} days ago`
  
  return day;
}



async function index(req, res) {

  try {
    const user = req.session.user
    const list = await prisma.user.findMany({
      where: {
        NOT: {
          username: user.username
        }
      },
      select: {
        username: true
      }
    })
    return res.render("index", {
      name,
      user,
      Avatar,
      list
    });

  } catch (e) {
    return res.redirect("/");
  }

}

function auth(req, res) {
  return res.render("auth", {
    name,
  });
}

async function chat(req, res) {

  try {
    const user = req.session.user, { chatter } = req.params;

    if (user.username == chatter) return res.render("error", {
      name,
      auth: true,
      error: {
        code: 404,
        message: `Not found`,
      },
    }
    )

    const dm = await prisma.user.findFirst({
      where: {
        username: chatter
      },
      select: {
        username: true,
      }
    })

    if (!dm) return res.render("error", {
      name,
      auth: true,
      error: {
        code: 404,
        message: `User - ${chatter} Not found`,
      },
    })

    const chats = await prisma.mail.findMany({
      where: {
        OR:
          [{
            from: dm.username,
            to: user.username
          },
          {
            from: user.username,
            to: dm.username
          }]
      }, orderBy: {
        created: "asc"
      }, select: {
        from: true,
        to: true,
        body: true,
        created: true
      }
    })

    return res.render("chat", {
      name, user, Avatar, chatter, chats, time
    })

  } catch (e) {
    return res.redirect("/");
  }

}


async function profile(req, res) {

  try {

    const self = req.session.user, { username } = req.params

    if (self.username == username) {

      return res.render("profile", {
        name, user: self, Avatar
      })

    }

    const user = await prisma.user.findFirst({
      where: { username },
      select: {
        uuid: true,
        username: true,
      }
    })

    if (!user) return res.render("error", {
      name,
      auth: true,
      error: {
        code: 404,
        message: `User: ${username} Not found`,
      },

    })

    return res.render("profile", {
      name, user, Avatar
    })

  } catch (e) {
    return res.redirect("/u")
  }

}


function error(req, res) {

  let auth = false;
  if (req.session.user) auth = true;

  return res.status(404).render("error", {
    name,
    auth,
    error: {
      code: 404,
      message: "Not found",
    },
  });

}

module.exports = { index, auth, chat, profile, error };

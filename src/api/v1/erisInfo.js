/**
 * Created by macdja38 on 2016-10-30.
 */

/**
 * Created by macdja38 on 2016-07-28.
 */

/* function checkAuth(req, res, next) {
 if (req.isAuthenticated()) return next();
 res.redirect('/');
 return true;
 }*/

function checkServerAuth(req, res, next) {
  if (req.isAuthenticated() && req.user.id === '85257659694993408') {
    return next();
  }
  res.sendStatus(403);
  return true;
}

function shardToJson(shard) {
  const copy = {};

  Object.keys(shard).forEach((key) => {
    if (!shard.hasOwnProperty(key) || key.startsWith('_')) return;

    if (key === 'heartbeatInterval' || key === 'ws') return;

    if (key === 'client') return;

    if (!shard[key]) {
      copy[key] = shard[key];
    } else if (shard[key] instanceof Set) {
      copy[key] = Array.from(shard[key]);
    } else if (shard[key] instanceof Map) {
      copy[key] = Array.from(shard[key].values());
    } else if (typeof shard[key].toJSON === 'function') {
      copy[key] = this[key].toJSON(key);
    } else {
      copy[key] = shard[key];
    }
  });

  return copy;
}

export default function register(app, { r }, eris) {
  /*  "/api/v1/prefix/:id"
   *    GET: find contact by id
   *    PUT: update contact by id
   *    DELETE: deletes contact by id
   */
  app.get('/api/v1/eris/', checkServerAuth, (req, res) => {
    const data = {};
    try {
      data.shardCount = eris.shards.size;
      data.serverCount = eris.guilds.size;
      data.channelCount = Object.keys(eris.channelGuildMap).length;
      data.users = eris.users.size;
      data.user = eris.user;
      data.options = eris.options.sum;
      data.gateway = eris.gateway;
      data.shardInfo = eris.shards.map(s => shardToJson(s));
    } catch (error) {
      console.error(error);
    }
    console.dir(data, { depth: 4 });
    res.json(data);
  });
}


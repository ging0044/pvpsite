/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import { CSSGrid, layout, SpringGrid, makeResponsive, measureItems } from 'react-stonecutter';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ServerList.css';

const title = 'Server List';

/*<li className={s.serverItem} key={guild.id}>
 <img className={s.icon} src={guild.icon == null ? `https://discordapp.com/api/guilds/97069403178278912/icons/8d7a71e1507514e9ab4345056c8b5cc3.jpg` : `https://discordapp.com/api/guilds/${guild.id}/icons/${guild.icon}.jpg`}/>
 <h3><a className={s.name} href={`/server/${guild.id}`}>{guild.name}</a></h3>
 </li>*/

let iconURL = [`https://discordapp.com/api/guilds/`, `/icons/`, `.jpg`];


function ServerList({ user }, context) {
  let avatarURL = `https://discordapp.com/api/users/${user.id}/avatars/${user.avatar}.jpg`;
  context.setTitle(title);

  const items = user.guilds.map(guild => {
    return (
      <div className={s.serverItem} key={guild.id}>
        <div className={s.serverGuildIconBox}>
          <img className={s.serverGuildIcon} src={guild.icon == null ? `https://discordapp.com/api/guilds/97069403178278912/icons/8d7a71e1507514e9ab4345056c8b5cc3.jpg` : `https://discordapp.com/api/guilds/${guild.id}/icons/${guild.icon}.jpg`}/>
        </div>
        <div className={s.serverLabel}>
          <h3><a href={`/server/${guild.id}`}>{guild.name}</a></h3>
        </div>
      </div>
    );
  });

  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1 className={s.title}>{user.username}'s Servers</h1>
        <SpringGrid
          component="div"
          columns={4}
          columnWidth={256}
          gutterWidth={5}
          gutterHeight={5}
          itemHeight={304}
          springConfig={{ stiffness: 170, damping: 26 }}
        >
          {items}
        </SpringGrid>
      </div>
    </div>
  );
}
ServerList.propTypes = {
  user: PropTypes.object,
};
ServerList.contextTypes = { setTitle: PropTypes.func.isRequired };
export default withStyles(s)(ServerList);

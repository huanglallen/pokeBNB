'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async(queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      url: 'https://nintendosoup.com/wp-content/uploads/2018/10/hinopika-pikachu-room-oct212018-2.jpg',
      preview: false
    },
    {
      spotId: 1,
      url: 'https://images.microcms-assets.io/assets/ce1faaee790f415685f2d99e2e862430/c73281b42ed7453597e9f72e039c3127/UENO%20EAST1_43s.jpg',
      preview: false
    },
    {
      spotId: 1,
      url: 'https://static.wikia.nocookie.net/pokemon/images/d/dc/Pikachu_M18.png',
      preview: false
    },
    {
      spotId: 1,
      url: 'https://nintendosoup.com/wp-content/uploads/2019/02/pikachuHome-1.jpg',
      preview: false
    },
    {
      spotId: 1,
      url: 'https://soranews24.com/wp-content/uploads/sites/3/2023/05/Pikachu-Afternoon-Tea-Tokyo-Pokemon-themed-cafe-Zelkova-Gramercy-House-Omotesando-food-review-photos-13.jpg',
      preview: true
    },
    {
      spotId: 2,
      url: 'https://d.wattpad.com/story_parts/734607872/images/15a0597dd17da035962013796069.jpg',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://gamingintel.com/wp-content/uploads/2023/03/Ash-at-Home-in-his-Last-Episode-1024x576.jpg',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://i.imgur.com/MdyCfk8.jpeg',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://cdn.80.lv/api/upload/content/43/5d2d1ef5d7df7.jpg',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://i.pinimg.com/originals/d6/25/af/d625af7199d518d5896f8b533ec0bd42.png',
      preview: true
    },
    {
      spotId: 3,
      url: 'https://static.wikia.nocookie.net/leonhartimvu/images/0/02/Cerulean_City_anime.png',
      preview: false
    },
    {
      spotId: 3,
      url: 'https://i0.wp.com/sixprizes.com/wp-content/uploads/2015/08/cerulean-city-gym-16-9-3.jpg',
      preview: false
    },
    {
      spotId: 3,
      url: 'https://static.wikia.nocookie.net/pokemon/images/b/b4/Cerulean_City_Gym_PE.png',
      preview: false
    },
    {
      spotId: 3,
      url: 'https://static1.thegamerimages.com/wordpress/wp-content/uploads/2021/03/Misty-Gym-Pokemon.png',
      preview: false
    },
    {
      spotId: 3,
      url: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/80ff523f-ff84-457d-a547-464588d3a3d3/dbne00b-a32366b9-ecb6-4950-be13-bbe2d5d4d600.png/v1/fill/w_978,h_550,q_80,strp/misty_s_new_cerulean_gym_by_willdinomaster55_dbne00b-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTUwIiwicGF0aCI6IlwvZlwvODBmZjUyM2YtZmY4NC00NTdkLWE1NDctNDY0NTg4ZDNhM2QzXC9kYm5lMDBiLWEzMjM2NmI5LWVjYjYtNDk1MC1iZTEzLWJiZTJkNWQ0ZDYwMC5wbmciLCJ3aWR0aCI6Ijw9OTc4In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.qp9FM8mnGGSJukX-8a99F9Py-lttXXPF4GrVyBNC0mo',
      preview: true
    },
    {
      spotId: 4,
      url: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/07/pokemon-anime-pewter-city.jpg',
      preview: false
    },
    {
      spotId: 4,
      url: 'https://art.ngfiles.com/images/1273000/1273487_elitheguy_pewter-city-gym-leader-brock.png',
      preview: false
    },
    {
      spotId: 4,
      url: 'https://www.serebii.net/anime/pictures/specials/027/DP82.jpg',
      preview: false
    },
    {
      spotId: 4,
      url: 'https://static1.thegamerimages.com/wordpress/wp-content/uploads/2021/06/brock.jpg',
      preview: false
    },
    {
      spotId: 4,
      url: 'https://gonnawatchemall.files.wordpress.com/2017/01/0005.png',
      preview: true
    },
    {
      spotId: 5,
      url: 'https://i.ytimg.com/vi/Nk1hjtUKWZY/hqdefault.jpg',
      preview: false
    },
    {
      spotId: 5,
      url: 'https://www.cnet.com/a/img/resize/18fca7d1a156fcaaf6d3722fffcf29c830afaa9d/hub/2013/01/17/8c445ead-cc2e-11e2-9a4a-0291187b029a/pc_6.jpg?auto=webp&width=1200',
      preview: false
    },
    {
      spotId: 5,
      url: 'https://gaijinpot.scdn3.secure.raxcdn.com/app/uploads/sites/6/2020/01/Graffiti-Pikachu-Shibuya-Pokemon-Center.jpg',
      preview: false
    },
    {
      spotId: 5,
      url: 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2021/01/joy-pokemon.jpg',
      preview: false
    },
    {
      spotId: 5,
      url: 'https://static.wikia.nocookie.net/pokemon/images/e/e4/A_Pokemon_Center_in_the_anime.jpg',
      preview: true
    },
    {
      spotId: 6,
      url: 'https://64.media.tumblr.com/eaf5230225698491bdff37b6ad1c8964/tumblr_pjg36t70V01vbed1so1_1280.png',
      preview: false
    },
    {
      spotId: 6,
      url: 'https://static.wikia.nocookie.net/project_polaro_official/images/7/78/Elite_Four.png',
      preview: false
    },
    {
      spotId: 6,
      url: 'https://preview.redd.it/drew-the-kanto-elite-four-as-team-rocket-admins-drawing-vid-v0-0t142602c6j81.png?auto=webp&s=78a14ca3ea51d36346254b0f47b88490d7470981',
      preview: false
    },
    {
      spotId: 6,
      url: 'https://i.imgur.com/tQ7KtKo.png',
      preview: false
    },
    {
      spotId: 6,
      url: 'https://static.wikia.nocookie.net/pokemon/images/0/04/Indigo_Plateau_anime.png',
      preview: true
    },
    {
      spotId: 7,
      url: 'https://static.wikia.nocookie.net/fantendo/images/b/b2/Pokemon_Contest_by_bijou457.jpg',
      preview: false
    },
    {
      spotId: 7,
      url: 'https://cdn.myanimelist.net/s/common/uploaded_files/1449778895-779c14658f4cf3ce1e066b8cb1fac557.png',
      preview: false
    },
    {
      spotId: 7,
      url: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-omega-ruby-and-alpha-sapphire/7/7b/Pokemon_contest_moves6.jpg',
      preview: false
    },
    {
      spotId: 7,
      url: 'https://static.wikia.nocookie.net/pokemon/images/2/25/Hearthome_Pok%C3%A9mon_Contest.jpg',
      preview: false
    },
    {
      spotId: 7,
      url: 'https://marriland.com/wp-content/uploads/2021/08/Pokemon_Brilliant_Diamond_and_Shining_Pearl_-_Super_Contest_Show_Art-2.png',
      preview: true
    },
    {
      spotId: 8,
      url: 'https://pbs.twimg.com/media/FdWyetRWQAIJEoi.jpg',
      preview: false
    },
    {
      spotId: 8,
      url: 'https://e1.pxfuel.com/desktop-wallpaper/730/671/desktop-wallpaper-pokemon-oak-s-lab-professor-oak.jpg',
      preview: false
    },
    {
      spotId: 8,
      url: 'https://w0.peakpx.com/wallpaper/299/161/HD-wallpaper-pokemon-professors-professor-elm-pocket-monster-professor-birch-pokemon-professor-rowan-magneton-professor-samuel-oak.jpg',
      preview: false
    },
    {
      spotId: 8,
      url: 'https://www.teechu.com/wp-content/uploads/2018/08/pokemon-professor-oak-facts-trivia.jpg',
      preview: false
    },
    {
      spotId: 8,
      url: 'https://comicvine.gamespot.com/a/uploads/scale_medium/11/114183/5212995-800px-professor_oaks_laboratory.png',
      preview: true
    },
    {
      spotId: 9,
      url: 'https://allenthewriterblog.files.wordpress.com/2019/01/800px-team_rocket_hq_pg.png',
      preview: true
    },
    {
      spotId: 9,
      url: 'https://pbs.twimg.com/media/El7Gd6QXUAAH43e.jpg',
      preview: true
    },
    {
      spotId: 9,
      url: 'https://3.bp.blogspot.com/-Pu-8AkV4a2o/VxuBVBcQFdI/AAAAAAAACk0/JA230fuHGYcUEKSpoWF8ZGo6ypG-QM0CACLcB/s1600/Giovanni_and_Mewtwo.png',
      preview: true
    },
    {
      spotId: 9,
      url: 'https://pbs.twimg.com/media/Fr_gLbFXwAEO3Kc?format=jpg',
      preview: true
    },
    {
      spotId: 9,
      url: 'https://cdn.images.express.co.uk/img/dynamic/143/750x445/1186908.jpg',
      preview: true
    },
    {
      spotId: 10,
      url: 'https://img.gamewith.net/img/0ea2981f0f1ce71b5178a644ba8c6823.jpg',
      preview: false
    },
    {
      spotId: 10,
      url: 'https://static.wikia.nocookie.net/leonhartimvu/images/8/8f/Viridian_City_anime.png',
      preview: false
    },
    {
      spotId: 10,
      url: 'https://screenrant.com/wp-content/uploads/Team-Rocket-Giovanni.jpg',
      preview: false
    },
    {
      spotId: 10,
      url: 'https://i.pinimg.com/736x/a1/23/e8/a123e816929cd2b5183151a099fb4a9a--team-rocket-pokemon.jpg',
      preview: false
    },
    {
      spotId: 10,
      url: 'https://media.comicbook.com/2019/10/viridian-gym-1189911.jpeg',
      preview: true
    },
    {
      spotId: 11,
      url: 'https://i.ytimg.com/vi/zvWxcGeYehg/maxresdefault.jpg',
      preview: false
    },
    {
      spotId: 11,
      url: 'https://i.ytimg.com/vi/hlh4jKv184E/maxresdefault.jpg',
      preview: false
    },
    {
      spotId: 11,
      url: 'https://i.pinimg.com/originals/69/26/62/6926623237edf2261c30351e23d78402.jpg',
      preview: false
    },
    {
      spotId: 11,
      url: 'https://cdnb.artstation.com/p/assets/images/images/049/296/931/large/luderick-grumeau-colere-1-vrai.jpg',
      preview: false
    },
    {
      spotId: 11,
      url: 'https://allenthewriterblog.files.wordpress.com/2019/01/lake-of-rage.jpg',
      preview: true
    },
    {
      spotId: 12,
      url: 'https://modernpaintbynumbers.com/wp-content/uploads/2021/10/Mew-Pokemon-Art-paint-by-numbers-500x400.jpg',
      preview: false
    },
    {
      spotId: 12,
      url: 'https://modernpaintbynumbers.com/wp-content/uploads/2021/10/Mew-Pokemon-Art-paint-by-numbers-500x400.jpg',
      preview: false
    },
    {
      spotId: 12,
      url: 'https://modernpaintbynumbers.com/wp-content/uploads/2021/10/Mew-Pokemon-Art-paint-by-numbers-500x400.jpg',
      preview: false
    },
    {
      spotId: 12,
      url: 'https://modernpaintbynumbers.com/wp-content/uploads/2021/10/Mew-Pokemon-Art-paint-by-numbers-500x400.jpg',
      preview: false
    },
    {
      spotId: 12,
      url: 'https://modernpaintbynumbers.com/wp-content/uploads/2021/10/Mew-Pokemon-Art-paint-by-numbers-500x400.jpg',
      preview: true
    },
    {
      spotId: 13,
      url: 'https://cdn.vox-cdn.com/thumbor/YbWDc9vizeAveTTNAKYPivK3NMc=/1400x1050/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/7422969/Ditto_Number_1.png',
      preview: false
    },
    {
      spotId: 13,
      url: 'https://i.pinimg.com/originals/2e/f7/9d/2ef79d4b95a6d408e2f809f5d22b79b9.jpg',
      preview: false
    },
    {
      spotId: 13,
      url: 'https://images4.wikia.nocookie.net/__cb20130204042255/es.pokemon/images/a/ae/EP672_Guarder%C3%ADa_Pok%C3%A9mon_(2).png',
      preview: false
    },
    {
      spotId: 13,
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ60-3J8ZGajMULR6hph-FRHvTElDSdvy0K7Q&usqp=CAU',
      preview: false
    },
    {
      spotId: 13,
      url: 'https://static.wikia.nocookie.net/alexiscooper/images/a/a7/Unova_Daycare.png',
      preview: true
    },
   ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] }
    }, {});
  }
};

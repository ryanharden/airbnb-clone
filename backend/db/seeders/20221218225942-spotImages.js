'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-755137040389728919/original/e85cf04c-2a57-41ac-bc69-c4eb5ff592ae.jpeg?im_w=960",
        preview: true
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-755137040389728919/original/334e3fe6-e50e-4423-a49b-10eabca6f993.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-755137040389728919/original/72860fa4-77ef-4455-945f-0197e8b875fe.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-755137040389728919/original/7951385c-cc79-41fb-8c7a-1a2fc5f99f5c.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-755137040389728919/original/51f42c88-7d14-49cd-9b32-1d3b3330b437.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/9eee0ce8-2dd2-459e-9823-598eaeec2b37.jpg?im_w=960",
        preview: true
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/70711058-d0ea-448d-8a50-152783ae20b7.jpg?im_w=480",
        preview: false
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/004a2ffd-0b2f-4394-b75f-4407010eee4c.jpg?im_w=480",
        preview: false
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/010a834e-e65a-4f3c-bbb1-fe056a4c77b4.jpg?im_w=480",
        preview: false
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/97da004e-07c6-4c1a-afb4-28c13aab6ff3.jpg?im_w=480",
        preview: false
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/ae39c728-74d3-4f8f-81a6-9ce1afc90a9c.jpg?im_w=1200",
        preview: true
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/1d1d37cc-0183-4788-b354-5f62d03430e1.jpg?im_w=480",
        preview: false
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/83cb4602-01cb-449e-94fb-5283a219a8fa.jpg?im_w=960",
        preview: false
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/58615a46-a0fd-412e-a809-f9e224924d48.jpg?im_w=480",
        preview: false
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/5f6d4771-c310-414d-86d9-44d7e2e33b20.jpg?im_w=480",
        preview: false
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-52162886/original/c0e040f5-e69e-4f23-a2cf-a5cc70be0684.jpeg?im_w=960",
        preview: true
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-52162886/original/d8ed62d7-42ab-4ee3-9e78-00b97f4bb55b.jpeg?im_w=480",
        preview: false
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-52162886/original/0910680d-890f-4af5-b64c-6d8cdd88f86b.jpeg?im_w=480",
        preview: false
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-52162886/original/9750f662-8910-49ac-932e-a11815deadbc.jpeg?im_w=480",
        preview: false
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-52162886/original/8677fe4a-ab3d-4823-91be-af1b25ebbdbf.jpeg?im_w=480",
        preview: false
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-787130202243308919/original/28edc72a-4ede-4df1-857b-d2927a825743.jpeg?im_w=960",
        preview: true
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-787130202243308919/original/82a40091-1339-4675-8897-8bccdc291c70.jpeg?im_w=480",
        preview: false
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-787130202243308919/original/397d7a60-97d2-44b4-9ead-b8daa304357f.jpeg?im_w=480",
        preview: false
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-787130202243308919/original/9e47f2a2-8515-4d31-8cf8-3f2aeca6a182.jpeg?im_w=480",
        preview: false
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-787130202243308919/original/7f2cab3e-2fdf-49ba-9ecc-2a8c623af942.jpeg?im_w=480",
        preview: false
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/21f7ba14-9afb-4014-b001-2e634236a5de.jpg?im_w=960",
        preview: true
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/40b87fe6-271e-46f4-b8f8-c6747e10c3ef.jpg?im_w=480",
        preview: false
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/1aadf8a9-692d-4cbb-9d10-7fecfbd224c1.jpg?im_w=480",
        preview: false
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/fd94e8a5-e18f-4c75-85c5-1f0ac17c078c.jpg?im_w=480",
        preview: false
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/42db9ad8-922b-4c08-9fc8-9e8045af5747.jpg?im_w=480",
        preview: false
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-19776614/original/7e965fec-dcc5-4314-8434-0527b1e7550c.jpeg?im_w=960",
        preview: true
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-19776614/original/5d1d305b-00fd-4ab9-b0c4-9644a90effee.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-19776614/original/f258d8dd-ad27-4068-af5f-8087d5c8631c.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-19776614/original/56e48cd9-15fd-4f64-baa4-49b2ae4717b7.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-19776614/original/b98ab06b-fccb-4856-a713-6c3f9157b476.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-717700197442034893/original/6fd0f5a1-3a8c-4db3-bd04-8dbd3c42493d.jpeg?im_w=960",
        preview: true
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-717700197442034893/original/6dc5beb5-a6c7-48f5-8d43-143335cae0d5.jpeg?im_w=480",
        preview: false
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-717700197442034893/original/b02a413c-1eb9-4f81-a4ba-7efc095285ef.jpeg?im_w=480",
        preview: false
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-717700197442034893/original/a4cf5fed-2e7d-45af-9238-ee6340042144.jpeg?im_w=480",
        preview: false
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-717700197442034893/original/ad877b4c-059b-4cee-817a-65a86965f6b1.jpeg?im_w=480",
        preview: false
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8]}
    }, {})
  }
};

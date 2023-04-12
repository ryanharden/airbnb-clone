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
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/1/s1i1.jpeg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/1/s1i2.jpeg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/1/s1i3.jpeg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/1/s1i4.jpeg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/1/s1i5.jpeg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/2/s2i1.jpeg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/2/s2i2.jpeg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/2/s2i3.jpeg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/2/s2i4.jpeg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/2/s2i5.jpeg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/3/s3i1.jpeg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/3/s3i2.jpeg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/3/s3i3.jpeg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/3/s3i4.jpeg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/3/s3i5.jpeg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/4/s4i1.jpeg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/4/s4i2.jpeg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/4/s4i3.jpeg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/4/s4i4.jpeg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/4/s4i5.jpeg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/5/s5i1.jpeg",
        preview: true
      },
      {
        spotId: 5,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/5/s5i2.jpeg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/5/s5i3.jpeg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/5/s5i4.jpeg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/5/s5i5.jpeg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/6/s6i1.jpeg",
        preview: true
      },
      {
        spotId: 6,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/6/s6i2.jpeg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/6/s6i3.jpeg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/6/s6i4.jpeg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/6/s6i5.jpeg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/7/s7i1.jpeg",
        preview: true
      },
      {
        spotId: 7,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/7/s7i2.jpeg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/7/s7i3.jpeg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/7/s7i4.jpeg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/7/s7i5.jpeg",
        preview: false
      },
      {
        spotId: 8,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/8/s8i1.jpeg",
        preview: true
      },
      {
        spotId: 8,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/8/s8i2.jpeg",
        preview: false
      },
      {
        spotId: 8,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/8/s8i3.jpeg",
        preview: false
      },
      {
        spotId: 8,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/8/s8i4.jpeg",
        preview: false
      },
      {
        spotId: 8,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/8/s8i5.jpeg",
        preview: false
      },
      {
        spotId: 9,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/9/s9i1.jpeg",
        preview: true
      },
      {
        spotId: 9,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/9/s9i2.jpeg",
        preview: false
      },
      {
        spotId: 9,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/9/s9i3.jpeg",
        preview: false
      },
      {
        spotId: 9,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/9/s9i4.jpeg",
        preview: false
      },
      {
        spotId: 9,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/9/s9i5.jpeg",
        preview: false
      },
      {
        spotId: 10,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/10/s10i1.jpeg",
        preview: true
      },
      {
        spotId: 10,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/10/s10i2.jpeg",
        preview: false
      },
      {
        spotId: 10,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/10/s10i3.jpeg",
        preview: false
      },
      {
        spotId: 10,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/10/s10i4.jpeg",
        preview: false
      },
      {
        spotId: 10,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/10/s10i5.jpeg",
        preview: false
      },
      {
        spotId: 11,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/11/s11i1.jpeg",
        preview: true
      },
      {
        spotId: 11,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/11/s11i2.jpeg",
        preview: false
      },
      {
        spotId: 11,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/11/s11i3.jpeg",
        preview: false
      },
      {
        spotId: 11,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/11/s11i4.jpeg",
        preview: false
      },
      {
        spotId: 11,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/11/s11i5.jpeg",
        preview: false
      },
      {
        spotId: 12,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/12/s12i1.jpeg",
        preview: true
      },
      {
        spotId: 12,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/12/s12i2.jpeg",
        preview: false
      },
      {
        spotId: 12,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/12/s12i3.jpeg",
        preview: false
      },
      {
        spotId: 12,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/12/s12i4.jpeg",
        preview: false
      },
      {
        spotId: 12,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/12/s12i5.jpeg",
        preview: false
      },
      {
        spotId: 13,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/13/s13i1.jpeg",
        preview: true
      },
      {
        spotId: 13,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/13/s13i2.jpeg",
        preview: false
      },
      {
        spotId: 13,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/13/s13i3.jpeg",
        preview: false
      },
      {
        spotId: 13,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/13/s13i4.jpeg",
        preview: false
      },
      {
        spotId: 13,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/13/s13i5.jpeg",
        preview: false
      },
      {
        spotId: 14,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/14/s14i1.jpeg",
        preview: true
      },
      {
        spotId: 14,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/14/s14i2.jpeg",
        preview: false
      },
      {
        spotId: 14,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/14/s14i3.jpeg",
        preview: false
      },
      {
        spotId: 14,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/14/s14i4.jpeg",
        preview: false
      },
      {
        spotId: 14,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/14/s14i5.jpeg",
        preview: false
      },
      {
        spotId: 15,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/15/s15i1.jpeg",
        preview: true
      },
      {
        spotId: 15,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/15/s15i2.jpeg",
        preview: false
      },
      {
        spotId: 15,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/15/s15i3.jpeg",
        preview: false
      },
      {
        spotId: 15,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/15/s15i4.jpeg",
        preview: false
      },
      {
        spotId: 15,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/15/s15i5.jpeg",
        preview: false
      },
      {
        spotId: 16,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/16/s16i1.jpeg",
        preview: true
      },
      {
        spotId: 16,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/16/s16i2.jpeg",
        preview: false
      },
      {
        spotId: 16,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/16/s16i3.jpeg",
        preview: false
      },
      {
        spotId: 16,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/16/s16i4.jpeg",
        preview: false
      },
      {
        spotId: 16,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/16/s16i5.jpeg",
        preview: false
      },
      {
        spotId: 17,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/17/s17i1.jpeg",
        preview: true
      },
      {
        spotId: 17,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/17/s17i2.jpeg",
        preview: false
      },
      {
        spotId: 17,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/17/s17i3.jpeg",
        preview: false
      },
      {
        spotId: 17,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/17/s17i4.jpeg",
        preview: false
      },
      {
        spotId: 17,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/17/s17i5.jpeg",
        preview: false
      },
      {
        spotId: 18,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/18/s18i1.jpeg",
        preview: true
      },
      {
        spotId: 18,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/18/s18i2.jpeg",
        preview: false
      },
      {
        spotId: 18,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/18/s18i3.jpeg",
        preview: false
      },
      {
        spotId: 18,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/18/s18i4.jpeg",
        preview: false
      },
      {
        spotId: 18,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/18/s18i5.jpeg",
        preview: false
      },
      {
        spotId: 19,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/19/s19i1.jpeg",
        preview: true
      },
      {
        spotId: 19,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/19/s19i2.jpeg",
        preview: false
      },
      {
        spotId: 19,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/19/s19i3.jpeg",
        preview: false
      },
      {
        spotId: 19,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/19/s19i4.jpeg",
        preview: false
      },
      {
        spotId: 19,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/19/s19i5.jpeg",
        preview: false
      },
      {
        spotId: 20,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/20/s20i1.jpeg",
        preview: true
      },
      {
        spotId: 20,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/20/s20i2.jpeg",
        preview: false
      },
      {
        spotId: 20,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/20/s20i3.jpeg",
        preview: false
      },
      {
        spotId: 20,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/20/s20i4.jpeg",
        preview: false
      },
      {
        spotId: 20,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/20/s20i5.jpeg",
        preview: false
      },
      {
        spotId: 21,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/21/s21i1.jpeg",
        preview: true
      },
      {
        spotId: 21,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/21/s21i2.jpeg",
        preview: false
      },
      {
        spotId: 21,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/21/s21i3.jpeg",
        preview: false
      },
      {
        spotId: 21,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/21/s21i4.jpeg",
        preview: false
      },
      {
        spotId: 21,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/21/s21i5.jpeg",
        preview: false
      },
      {
        spotId: 22,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/22/s22i1.jpeg",
        preview: true
      },
      {
        spotId: 22,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/22/s22i2.jpeg",
        preview: false
      },
      {
        spotId: 22,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/22/s22i3.jpeg",
        preview: false
      },
      {
        spotId: 22,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/22/s22i4.jpeg",
        preview: false
      },
      {
        spotId: 22,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/22/s22i5.jpeg",
        preview: false
      },
      {
        spotId: 23,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/23/s23i1.jpeg",
        preview: true
      },
      {
        spotId: 23,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/23/s23i2.jpeg",
        preview: false
      },
      {
        spotId: 23,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/23/s23i3.jpeg",
        preview: false
      },
      {
        spotId: 23,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/23/s23i4.jpeg",
        preview: false
      },
      {
        spotId: 23,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/23/s23i5.jpeg",
        preview: false
      },
      {
        spotId: 24,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/24/s24i1.jpeg",
        preview: true
      },
      {
        spotId: 24,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/24/s24i2.jpeg",
        preview: false
      },
      {
        spotId: 24,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/24/s24i3.jpeg",
        preview: false
      },
      {
        spotId: 24,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/24/s24i4.jpeg",
        preview: false
      },
      {
        spotId: 24,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/24/s24i5.jpeg",
        preview: false
      },
      {
        spotId: 25,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/25/s25i1.jpeg",
        preview: true
      },
      {
        spotId: 25,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/25/s25i2.jpeg",
        preview: false
      },
      {
        spotId: 25,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/25/s25i3.jpeg",
        preview: false
      },
      {
        spotId: 25,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/25/s25i4.jpeg",
        preview: false
      },
      {
        spotId: 25,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/25/s25i5.jpeg",
        preview: false
      },
      {
        spotId: 26,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/26/s26i1.jpeg",
        preview: true
      },
      {
        spotId: 26,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/26/s26i2.jpeg",
        preview: false
      },
      {
        spotId: 26,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/26/s26i3.jpeg",
        preview: false
      },
      {
        spotId: 26,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/26/s26i4.jpeg",
        preview: false
      },
      {
        spotId: 26,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/26/s26i5.jpeg",
        preview: false
      },
      {
        spotId: 27,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/27/s27i1.jpeg",
        preview: true
      },
      {
        spotId: 27,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/27/s27i2.jpeg",
        preview: false
      },
      {
        spotId: 27,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/27/s27i3.jpeg",
        preview: false
      },
      {
        spotId: 27,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/27/s27i4.jpeg",
        preview: false
      },
      {
        spotId: 27,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/27/s27i5.jpeg",
        preview: false
      },
      {
        spotId: 28,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/28/s28i1.jpeg",
        preview: true
      },
      {
        spotId: 28,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/28/s28i2.jpeg",
        preview: false
      },
      {
        spotId: 28,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/28/s28i3.jpeg",
        preview: false
      },
      {
        spotId: 28,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/28/s28i4.jpeg",
        preview: false
      },
      {
        spotId: 28,
        url: "https://nomad-nest.s3.us-west-2.amazonaws.com/Nomad+Nest+Seed+Images/28/s28i5.jpeg",
        preview: false
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    // return queryInterface.bulkDelete(options, {
    //   id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8]}
    // }, {})
    return queryInterface.bulkDelete(options, null, {});
  }
};

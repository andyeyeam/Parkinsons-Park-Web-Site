// ─────────────────────────────────────────────────────────────────────────────
// THE PARK POST — Issue content for July 2026 (Issue No. 1)
//
// This file holds ONLY the content that changes month to month. The design,
// the standing adverts (Willow + website), and the footer come from
// newsletters/template.mjs and stay identical across issues.
//
// Available image keys (see template.mjs): logo, hero, bluebells, gala,
// carnival, lantern, volunteers, oaks, frank, titheMap, remembrance, heritage.
//
// Generate with:  node scripts/generate-newsletter-pdf.js 2026-07
// ─────────────────────────────────────────────────────────────────────────────
export default {
  issueNo: 1,
  dateLabel: 'July 2026',

  heroCaption: "Parkinson’s Park, Guiseley — over 4,000 years of history on our doorstep",

  lede: `Welcome to the <b>very first issue</b> of The Park Post &mdash; a new newsletter from the Friends of
    Parkinson&rsquo;s Park (FOPP), sent to friends and neighbours who care about our shared green space. We&rsquo;ll bring
    you park news, what&rsquo;s coming up, and a little slice of the park&rsquo;s remarkable history in every issue. Thank
    you for reading, and for being part of our community.`,

  chair: {
    name: 'Chris Parapia',
    body: `<b>What&rsquo;s been going on?</b> We held our AGM at the Methodist Church, where we discussed the Business
      Improvement Plan and our growing links with the Scouts. On the volunteering front, in early May the 14th Airedale
      Scouts spent a session removing loads of old tree guards from the park &mdash; a real help in tidying up the young
      plantings. And in late June you may have spotted the FOPP stall at Guiseley Carnival, where it was lovely to meet so
      many of you.`,
  },

  aroundPark: [
    {
      title: 'The grass has finally been cut!',
      body: `Yes &mdash; at last the grass has been cut! Why had it not been done sooner, we hear you ask? The grass is
        cut four times a year by Meadfleet, and FOPP liaises with them to make sure it happens. This year a change of
        contractor meant a frustrating delay, but it&rsquo;s now back on track.`,
    },
    {
      title: 'Anti-social behaviour update',
      body: `Happily, only a few minor incidents to report, including some damage to the Bog Garden sign. If you see
        anti-social behaviour or vandalism in the park, please report it to West Yorkshire Police on <b>101</b> (or 999
        in an emergency) and let a FOPP director know so we can follow up. Our Park Watch scheme works best when the whole
        community keeps a friendly eye out.`,
    },
  ],

  didYouKnow: {
    number: 1,
    title: "The Vikings named our springs &mdash; and they&rsquo;re still flowing",
    image: 'bluebells',
    paragraphs: [
      `One corner of the park is called <b>Kelcliffe</b>, a name that comes straight from Old Norse and means roughly
        <i>&ldquo;the steep place where the springs are.&rdquo;</i> It was coined more than 1,000 years ago, when Guiseley
        lay within the Viking kingdom of Jorvik (York).`,
      `The remarkable part? Those very same springs are <b>still running today</b> &mdash; they feed the park&rsquo;s Bog
        Garden, created in 2016. So every time you pass that wet, marshy ground, you&rsquo;re looking at water the Vikings
        knew a millennium ago. History you can still hear trickling.`,
    ],
  },

  events: [
    { when: 'Sun 6 Sept', title: 'Summer Gala', body: `our biggest day of the year, with Bubble Mania and the Guiseley Brass Band. A great afternoon out for all the family.` },
    { when: 'July', title: 'July Working Party', body: `Top Copse improvements: defining pathways, spreading woodchip and maintaining the insect hotels.` },
    { when: 'Fri 3 Oct', title: 'Kindness Festival', body: `a community celebration in the park.` },
    { when: 'Autumn / Winter', title: 'Bluebell Wood planting', body: `planting more bluebells for the bluebell wood, working with local schools.` },
    { when: 'Year-round', title: 'The Celebration Tree', body: `our tree that marks the seasons and special occasions, dressed with lights and decorations through Advent.` },
  ],

  eventImages: [
    { key: 'gala', caption: 'Fun for all ages at the annual Gala' },
    { key: 'carnival', caption: 'The FOPP stall at Guiseley Carnival' },
  ],

  faqs: [
    { q: 'Who owns the park?', a: `The land is protected for community benefit &mdash; a legacy that traces back to the Parkinson family, who created the park in the 1930s.` },
    { q: 'Who runs the park?', a: `Friends of Parkinson&rsquo;s Park (FOPP), a Community Interest Company run by local volunteers, cares for and champions the park.` },
  ],
};

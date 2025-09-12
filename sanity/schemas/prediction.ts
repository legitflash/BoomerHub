import {defineField, defineType} from 'sanity'
import {Trophy} from 'lucide-react'

export default defineType({
  name: 'prediction',
  title: 'Prediction',
  type: 'document',
  icon: Trophy,
  fields: [
    defineField({
      name: 'homeTeam',
      title: 'Home Team',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'awayTeam',
      title: 'Away Team',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'league',
      title: 'League',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
     defineField({
      name: 'matchDate',
      title: 'Match Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'prediction',
        title: 'Main Prediction',
        type: 'string',
        description: "e.g., 'Home Team to Win', 'Over 2.5 Goals', 'Both Teams to Score'",
        validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'correctScore',
        title: 'Correct Score Prediction',
        type: 'string',
        description: "e.g., '2-1', '1-0'",
    }),
     defineField({
        name: 'odds',
        title: 'Odds',
        type: 'string',
        description: "e.g., '1.85', '2/1'",
        validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'confidence',
      title: 'Confidence Level',
      type: 'string',
      options: {
        list: [
          {title: 'High', value: 'high'},
          {title: 'Medium', value: 'medium'},
          {title: 'Low', value: 'low'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Pending', value: 'Pending'},
          {title: 'Won', value: 'Won'},
          {title: 'Lost', value: 'Lost'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
       initialValue: 'Pending',
    }),
    defineField({
        name: 'isHot',
        title: 'Hot Tip?',
        type: 'boolean',
        description: 'Enable this to show a "Hot Tip" banner on the card.',
        initialValue: false,
    }),
    defineField({
        name: 'analysis',
        title: 'Expert Analysis',
        description: '(Optional) Provide a detailed analysis or rationale for the prediction. This will be shown on the details page.',
        type: 'blockContent',
    }),
    defineField({
        name: 'homeTeamLogo',
        title: 'Home Team Logo',
        type: 'image',
        description: '(Optional) If not provided, a logo will be fetched automatically from Clearbit.'
    }),
    defineField({
        name: 'awayTeamLogo',
        title: 'Away Team Logo',
        type: 'image',
        description: '(Optional) If not provided, a logo will be fetched automatically from Clearbit.'
    }),
    defineField({
        name: 'homeTeamForm',
        title: 'Home Team Form (Last 5)',
        type: 'array',
        description: "Enter the last 5 match results for the home team (W, D, or L).",
        of: [{type: 'string', options: { list: ['W', 'D', 'L']}}],
        validation: Rule => Rule.max(5)
    }),
    defineField({
        name: 'awayTeamForm',
        title: 'Away Team Form (Last 5)',
        type: 'array',
        description: "Enter the last 5 match results for the away team (W, D, or L).",
        of: [{type: 'string', options: { list: ['W', 'D', 'L']}}],
        validation: Rule => Rule.max(5)
    }),
  ],
  preview: {
    select: {
      homeTeam: 'homeTeam',
      awayTeam: 'awayTeam',
      league: 'league',
      status: 'status',
    },
    prepare(selection) {
      const {homeTeam, awayTeam, league, status} = selection
      return {
        title: `${homeTeam} vs. ${awayTeam}`,
        subtitle: `${league} - ${status}`,
        media: Trophy
      }
    },
  },
  initialValue: () => ({
    matchDate: new Date().toISOString(),
    status: 'Pending',
    confidence: 'medium',
    isHot: false,
  }),
})

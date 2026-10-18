import { Box, Paper, Typography } from '@mui/material';

const paragraphs = [
  `Completing the Computer Science program at Southern New Hampshire
  University and developing my ePortfolio have helped me strengthen my
  technical skills and clarify my professional goals. My associate degree,
  full stack boot camp experience, and work building websites for local
  businesses gave me a foundation in application development. Pursuing a
  bachelor’s degree with a concentration in Software Engineering has expanded
  that foundation through coursework in algorithms, databases, testing,
  security, and software design. My goal is to work as a software engineer
  with a focus on full stack development. I value clear communication,
  maintainable code, reliable functionality, and protecting user information.
  This portfolio provides examples of how I apply those priorities to
  software development.`,

  `My coursework has helped me approach problems from several technical
  perspectives. Working with C++ strengthened my understanding of data types,
  exceptions, and the importance of checking program behavior under
  unexpected conditions. Java and Android development gave me experience
  organizing application logic, managing user interactions, and connecting
  interfaces to stored data. Embedded systems coursework involving a
  Raspberry Pi required me to consider how software responds to hardware
  inputs and changing conditions. My full stack coursework also provided
  experience connecting an Angular interface to a Node.js application and
  MongoDB database. These experiences broadened my understanding of how
  individual components contribute to a complete system.`,

  `Collaboration and communication are important parts of my preparation
  for a software engineering career. My restaurant work requires coordinating
  with coworkers, communicating priorities, and responding to changing needs.
  Building websites for local businesses also requires understanding what
  someone wants to accomplish and translating those needs into technical
  decisions. These experiences have reinforced the importance of listening,
  asking clear questions, and explaining choices in language that fits the
  audience. In a development team, I can apply these habits when discussing
  requirements, comparing solutions, and working with people who have
  different responsibilities and technical backgrounds. Using GitHub
  branches during my capstone also helped me organize changes into separate
  stages and preserve a history that others can inspect.`,

  `Developing the portfolio strengthened my ability to communicate technical
  work through writing and visual presentation. The enhancement narratives
  required me to explain why I selected an artifact, what I changed, what I
  learned, and how the work supports the course outcomes. This required more
  than listing technologies or describing features. I needed to connect
  implementation decisions to their purpose and explain challenges clearly.
  Designing forms, navigation, validation messages, and data displays also
  required considering what users need to understand. Together, these
  activities helped me practice presenting information to both technical
  reviewers and people primarily interested in using an application.`,

  `My understanding of algorithms and data structures developed through
  implementing and evaluating a calorie calculator for the Weight Tracker
  application. I separated the calculation function from the React interface
  so the mathematical logic could be tested independently. The function
  validates inputs, converts measurements, performs the calculation, and
  returns an object with named results. Its fixed sequence of operations
  uses constant time and constant additional space. Eight unit tests check
  expected results, invalid inputs, age boundaries, and preservation of the
  original input object. Correcting an inaccurate test expectation reminded
  me that test data must be verified as carefully as implementation code.
  I later reused the same function on the server to calculate the result
  before saving it. The client uses the function to validate inputs, while
  the server produces the stored recommendation. This gave me experience
  extending a reusable algorithm across application layers without maintaining
  separate formulas. The fixed sedentary activity assumption simplifies the
  feature but limits its flexibility.`,

  `The software engineering enhancement demonstrates my ability to adapt
  an existing application to a different architecture. I rebuilt my Android
  Weight Tracker as a web application using React, Node.js, Express, and
  GraphQL. Separating the client and server gave each part a clearer
  responsibility, while reusable components and Material UI supported
  consistent interface design. One challenge involved a weight entry being
  saved without immediately appearing in the displayed list. Resolving that
  issue improved my understanding of how server data, Apollo Client caching,
  and page navigation interact. I applied that understanding to the calorie
  calculator by loading the saved calculation through the Calorie Log page
  and updating its cached query after a successful save. The saved recommendation
  is displayed separately from the editable form, so changing an input does
  not remove the previously saved result. This work reinforced the importance
  of tracing a problem through the interface, API, and database.`,

  `Database development and security became closely connected during the
  final enhancement. I replaced temporary arrays with persistent MongoDB
  operations and created Mongoose models for users, weight entries, goals,
  and calorie entries. I later added a CalorieCalculation model to store each
  account’s latest age, sex, height, weight, and calculated calorie values.
  User references establish ownership, validation rules constrain stored
  values, and unique indexes limit each account to one goal and one saved
  calculation. The application retrieves the saved calculation when the
  user returns to the calorie page. This connected the algorithm enhancement
  to persistent database operations.`,

  `I also improved how the application handles authentication. The route
  guard checks for missing, malformed, and expired tokens and schedules a
  session check when a token expires. I removed the separate loggedIn value
  from local storage so the interface uses the token’s expiration rather
  than an independent login flag. Server operations still verify the JWT
  signature and expiration before using its user identity to access records.
  Password hashing and clearing Apollo’s account data during authentication
  changes provide additional protection. This work helped me distinguish
  between controlling navigation in the browser and enforcing authorization
  on the server.`,

  `Moving the application from local development to MongoDB Atlas and Render
  expanded my experience with deployment. I configured the hosted database
  connection, used environment variables for configuration and credentials,
  and deployed the application with its React build served by Express.
  Troubleshooting the startup process required checking build commands,
  database connectivity, and the server’s listening port. I checked Atlas
  to confirm that the deployed application could add and update records.
  I also published the React ePortfolio through GitHub Pages and included
  access to the live application. These steps helped me understand the work
  required to make a project available outside my development environment.`,

  `My portfolio uses one original artifact to demonstrate growth across
  software design and engineering, algorithms and data structures, and
  databases. The original Android application provides a starting point for
  comparison, and the enhanced web application shows how I expanded its
  architecture, computational functionality, and data management. The
  accompanying narratives explain the reasoning and learning behind those
  changes. Together, these materials demonstrate my ability to evaluate
  computing solutions, select appropriate tools, and apply a security
  mindset throughout development. They also show how my technical work
  supports the communication and collaboration skills I will bring to a
  professional team.`,

  `As I move toward a software engineering career, I want to continue
  developing applications that are useful, understandable, and maintainable.
  This capstone strengthened my confidence in working across an application’s
  interface, logic, API, and database while identifying assumptions that need
  testing. It also reinforced the value of explaining limitations accurately
  and supporting claims with working code and observable results. I am
  prepared to contribute my full stack development experience while
  continuing to learn from teammates, stakeholder feedback, and the
  practical demands of maintaining software.`,
];

export default function SelfAssessment() {
  return (
    <Paper
      component="section"
      id="self-assessment"
      aria-labelledby="self-assessment-heading"
      elevation={0}
      sx={{
        p: { xs: 3, md: 5 },
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        scrollMarginTop: { xs: 24, md: 112 },
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        id="self-assessment-heading"
        sx={{
          mb: 3,
          color: '#152b43',
          fontWeight: 700,
          fontSize: { xs: '1.6rem', md: '2rem' },
        }}
      >
        Professional Self-Assessment
      </Typography>

      <Box sx={{ maxWidth: '80ch' }}>
        {paragraphs.map((paragraph, index) => (
          <Typography
            key={index}
            component="p"
            sx={{
              mb: 2.5,
              lineHeight: 1.8,
              '&:last-child': { mb: 0 },
            }}
          >
            {paragraph}
          </Typography>
        ))}
      </Box>
    </Paper>
  );
}
import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './data/schema';

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(3000, function () {
  console.log('Listening on port 3000');
});
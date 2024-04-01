import { Image, Container, Title, Text, Button, SimpleGrid } from '@mantine/core';
import classes from "./errorPage.module.css"
import { Link } from 'react-router-dom';

export function ErrorPage() {
  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image src="/images/one-piece-logo.svg" className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>Une erreur est survenue...</Title>
          <Text c="dimmed" size="lg">
            La page que vous essayez d'ouvrir n'existe pas. Il se peut que vous ayez mal saisi l'adresse ou que la page ait été déplacée vers une autre URL.
          </Text>
          <Link to="/">
            <Button variant="outline" size="md" mt="xl" className={classes.control}>
              Revenir vers la page d'accueil 
            </Button>
          </Link>
        </div>
      </SimpleGrid>
    </Container>
  );
}
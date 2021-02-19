import * as React from "react"
import { AppBar, Toolbar, IconButton, List, ListItem, ListItemText, makeStyles, Container } from "@material-ui/core"
import { Home } from "@material-ui/icons"

const useStyles = makeStyles({
    navbarDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`
      },
    navDisplayFlex: {
      display: `flex`,
      justifyContent: `space-between`
    },
    linkText: {
      textDecoration: `none`,
      textTransform: `uppercase`,
      color: `white`
    }
  });

const navLinks = [
    { title: `about us`, path: `/#` },
    { title: `product`, path: `/#` },
    { title: `blog`, path: `/#` },
    { title: `contact`, path: `/#` },
    { title: `faq`, path: `/#` },
  ]

  const Navbar = () => {
      const classes = useStyles();
    return (
      <AppBar position="static" >
        <Toolbar>
        <Container className={classes.navbarDisplayFlex} maxWidth="lg" >
        <IconButton edge="start" color="inherit" aria-label="home">
          <Home fontSize="large" />
        </IconButton>
        <List
        component="nav"
        aria-labelledby="main navigation"
        className={classes.navDisplayFlex}
        >
        {navLinks.map(({ title, path }) => (
            <a href={path} key={title} className={classes.linkText}>
            <ListItem button >
                <ListItemText primary={title} />
            </ListItem>
            </a>
        ))}
        </List>
        </Container>
        </Toolbar>
      </AppBar>
    )
  }

  export default Navbar;
  

  
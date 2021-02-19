import {AppBar, Toolbar, Container, Typography} from '@material-ui/core';
const Footer = () => {

    return (
        <div>
        <AppBar style={{position: 'fixed', bottom:0 }} position="static" color="primary">
          <Container maxWidth="lg">
            <Toolbar>
              <Typography  variant="body1" color="inherit" style={{textAlign: 'center'}}>
                © 2019 Rapid API | All Rights Reserved
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
        </div>
    )
}
export default Footer;
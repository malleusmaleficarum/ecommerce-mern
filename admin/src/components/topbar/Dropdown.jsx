import styled from 'styled-components';

const Dropdown = () => {
  return (
     <Container>
         <List>
            <ListItem>
                Profile
            </ListItem>
            <ListItem>
                Settings
            </ListItem>
            <ListItem>
                Sign Out
            </ListItem>
         </List>
     </Container>
  )
}

const Container = styled.div`
position:absolute;
top:45px;
right: 3px;
width:200px;
min-height:80px;
border-radius:10px;
background-color:white;
-webkit-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.25); 
box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.25);
`;

const List = styled.ul`
padding:10px 15px;
list-style:none;
`;

const ListItem = styled.li`
cursor:pointer;
`;

export default Dropdown
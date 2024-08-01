export const matchData = [
  {
    id: '1',
    first_Name: 'Princes Fiona',
    active: true,
    profilePicture:
      'https://ringwooddental.com.au/wp-content/uploads/2018/05/profile-placeholder-f-e1526434202694.jpg',
    age: '21',
    height: '5.2',
    meretialStatus: 'Never Married',
    religion: 'Muslim',
    livingCountry: 'Rangpur',
    motherToung: 'bangla',
    about:
      'I am lookin for a suitable partner for my relative. He has complete her BS.c engineering. heigh 6.2 lookin handsome good looking.',
  },
  {
    id: '2',
    first_Name: 'Olivia',
    active: false,
    profilePicture:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgWjX5dynW04yySDP5IB4lW5UTRo3G0wPTZQ&usqp=CAU',
    age: '3',
    height: '5.2',
    meretialStatus: 'Never Married',
    religion: 'Muslim',
    livingCountry: 'Dhaka',
    motherToung: 'bangla',
    about:
      'I am lookin for a suitable partner for my relative. He has complete her BS.c engineering. heigh 6.2 lookin handsome good looking.',
  },
  {
    id: '4',
    first_Name: 'Emma',
    active: false,
    profilePicture:
      'https://e7.pngegg.com/pngimages/122/453/png-clipart-computer-icons-user-profile-avatar-female-profile-heroes-head.png',
    age: '21',
    height: '5.2',
    meretialStatus: 'Never Married',
    religion: 'Muslim',
    livingCountry: 'Dhaka',
    motherToung: 'bangla',
    about:
      'I am lookin for a suitable partner for my relative. He has complete her BS.c engineering. heigh 6.2 lookin handsome good looking.',
  },
  {
    id: '5',
    first_Name: 'Ava',
    active: false,
    profilePicture:
      'https://image.freepik.com/free-vector/portrait-caucasian-woman-profile-with-long-hair-avatar-young-white-girl_102172-419.jpg',
    age: '21',
    height: '5.2',
    meretialStatus: 'Never Married',
    religion: 'Muslim',
    livingCountry: 'Dhaka',
    motherToung: 'bangla',
    about:
      'I am lookin for a suitable partner for my relative. He has complete her BS.c engineering. heigh 6.2 lookin handsome good looking.',
  },
  {
    id: '6',
    first_Name: 'Sophia',
    active: false,
    profilePicture:
      'https://previews.123rf.com/images/grgroup/grgroup1611/grgroup161103885/65282244-woman-cartoon-icon-female-avatar-person-human-and-people-theme-isolated-design-vector-illustration.jpg',
    age: '21',
    height: '5.2',
    meretialStatus: 'Never Married',
    religion: 'Muslim',
    livingCountry: 'Dhaka',
    motherToung: 'bangla',
    about:
      'I am lookin for a suitable partner for my relative. He has complete her BS.c engineering. heigh 6.2 lookin handsome good looking.',
  },
  {
    id: '7',
    first_Name: 'Isabella',
    active: false,
    profilePicture:
      'https://ringwooddental.com.au/wp-content/uploads/2018/05/profile-placeholder-f-e1526434202694.jpg',
    age: '21',
    height: '5.2',
    meretialStatus: 'Never Married',
    religion: 'Muslim',
    livingCountry: 'Dhaka',
    motherToung: 'bangla',
    about:
      'I am lookin for a suitable partner for my relative. He has complete her BS.c engineering. heigh 6.2 lookin handsome good looking.',
  },
  {
    id: '8',
    first_Name: 'Charlotte',
    active: false,
    profilePicture:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeuIfN_cf4QSbC5WkQxTc8HHIE2Edru6Orbw&usqp=CAU',
    age: '21',
    height: '5.2',
    meretialStatus: 'Never Married',
    religion: 'Muslim',
    livingCountry: 'Dhaka',
    motherToung: 'bangla',
    about:
      'I am lookin for a suitable partner for my relative. He has complete her BS.c engineering. heigh 6.2 lookin handsome good looking.',
  },
];

export const singlProfile = (id: any | undefined) => {
  // eslint-disable-next-line no-underscore-dangle
  const result = matchData.filter((data) => data.id === id);
  return result;
};

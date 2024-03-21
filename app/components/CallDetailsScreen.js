import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import SegmentedControl from '@react-native-segmented-control/segmented-control';
const CallDetailsScreen = () => {
 const [selectedTab, setSelectedTab] = useState(0);
//  const handleTabPress = (tabIndex) => {
//    setSelectedTab(tabIndex);
//  };
 console.log('selectedTab',selectedTab);
 let colors1 = selectedTab == 0
 let colors2 = selectedTab == 1

 console.log('color1',colors1);
 console.log('color2',colors2);


 return (
<View style={styles.container}>
<SegmentedControl
    values={['Call Queue', 'History']}
    selectedIndex={selectedTab}
    onChange={(event) => {
        let data = event.nativeEvent

        setSelectedTab(data.selectedSegmentIndex);
    }}
    style={{ flex: 1,
        justifyContent: 'space-between',
        backgroundColor:'grey',
       width:wp('85%'),
       marginTop: hp('5%'),
        }}
  />

</View>
 );
};
const styles = StyleSheet.create({
 container: {
   flex: 0.1,
   justifyContent: 'center',
   alignItems: 'center',
 },
 tabContainer: {
   flexDirection: 'row',
   justifyContent:'space-around',
   width: wp('100%')
 },
 tab: {
   paddingVertical: 10,
   paddingHorizontal: 20,
   borderRadius: 5,
   borderWidth: 1,
   borderColor: '#ccc',
 },
 activeTab: {
   backgroundColor: 'red',
   borderColor: 'red',
 },
 tabText: {
   color: 'black',
 },
 tabContent: {
   alignItems: 'center',
 },
});
export default CallDetailsScreen;
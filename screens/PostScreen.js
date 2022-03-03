import React, { useRef,useEffect, useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    ImageBackground,
    TouchableOpacity,
    FlatList,
    Animated,
    Alert,
    Platform
} from 'react-native';
import { VictoryPie } from 'victory-native';
import firebase from "../database/firebase";
import {Svg} from 'react-native-svg';

import { COLORS, FONTS, SIZES, icons, images } from '../constants';

const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];

const Home = () => {
    const [hidden, setHidden] = useState(false);
    const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
    const [statusBarTransition, setStatusBarTransition] = useState(TRANSITIONS[0]);
  
    const changeStatusBarVisibility = () => setHidden(!hidden);
  
    const changeStatusBarStyle = () => {
      const styleId = STYLES.indexOf(statusBarStyle) + 1;
      if (styleId === STYLES.length) {
        setStatusBarStyle(STYLES[0]);
      } else {
        setStatusBarStyle(STYLES[styleId]);
      }
    };
  
    const changeStatusBarTransition = () => {
      const transition = TRANSITIONS.indexOf(statusBarTransition) + 1;
      if (transition === TRANSITIONS.length) {
        setStatusBarTransition(TRANSITIONS[0]);
      } else {
        setStatusBarTransition(TRANSITIONS[transition]);
      }
    };


    const [users, setUsers] = useState([]);
   
  const [totalBoysCount  , setTotalBoysCount ] = useState(0);
  const [totalGirlsCount , setTotalGirlsCount ] = useState(0);

    useEffect(() => {
        firebase.db.collection("users").onSnapshot((querySnapshot) => {
          const users = [];

          let BoysCount = 0;
          let GirlsCount = 0;

            querySnapshot.docs.forEach((doc) => {
               const { name, Department, Section, Year, Boys, Girls } = doc.data();
               users.push({
                   id: doc.id,
                   name,
                   Department,
                   Section,
                   Year,
                   Boys,
                   Girls,
               });
               BoysCount = BoysCount + parseInt(Boys) 
               GirlsCount = GirlsCount + parseInt(Girls) 
             
            });
         
            setUsers(users)
            
            setTotalBoysCount((oldValue) => BoysCount)
            setTotalGirlsCount((oldValue1) => GirlsCount)
        });
    }, []);

    const results = totalBoysCount + totalGirlsCount



    const deleteUser = async () => {
        const dbRef = firebase.db.collection("users").get().then(documents => {
            documents.forEach(document => {
                document.ref.delete()
            }) 
        });
        props.navigation.navigate("UsersList")
    }


    const openConfirmationAlert = () => {
        Alert.alert("Remove The User", "Are you sure?", [
            {text: "Yes", onPress: () => deleteUser()},
            {text: "No", onPress: () => console.log(false)},
  
        ])
    

    }
    const confirmStatus = "C"
    const pendingStatus = "P"
    const SPACING = 20;
    const AVATAR_SIZE = 70;
    
    let categoriesData = [
        {
            id: 1,
            name: "Education",
            icon: icons.education,
            color: COLORS.yellow,
            expenses: [
                {
                    id: 1,
                    title: "Tuition Fee",
                    description: "Tuition fee",
                    location: "ByProgrammers' tuition center",
                    total: 100.00,
                    status: pendingStatus
                },
                {
                    id: 2,
                    title: "Arduino",
                    description: "Hardward",
                    location: "ByProgrammers' tuition center",
                    total: 30.00,
                    status: pendingStatus
                },
                {
                    id: 3,
                    title: "Javascript Books",
                    description: "Javascript books",
                    location: "ByProgrammers' Book Store",
                    total: 20.00,
                    status: confirmStatus
                },
               
            ],
        },
       
        {
            id: 3,
            name: "Child",
            icon: icons.baby_car,
            color: COLORS.gray,
            expenses: [
                {
                    id: 7,
                    title: "Toys",
                    description: "toys",
                    location: "ByProgrammers' Toy Store",
                    total: 25.00,
                    status: confirmStatus,
                },
                {
                    id: 8,
                    title: "Baby Car Seat",
                    description: "Baby Car Seat",
                    location: "ByProgrammers' Baby Care Store",
                    total: 100.00,
                    status: pendingStatus,
                },
               
                {
                    id: 10,
                    title: "Baby T-Shirt",
                    description: "T-Shirt",
                    location: "ByProgrammers' Fashion Store",
                    total: 20.00,
                    status: pendingStatus,
                },
            ],
        },
       
       

    ]

    const categoryListHeightAnimationValue = useRef(new Animated.Value(115)).current;

    const [categories, setCategories] = React.useState(categoriesData)
    const [viewMode, setViewMode] = React.useState("chart")
    const [selectedCategory, setSelectedCategory] = React.useState(null)
    const [showMoreToggle, setShowMoreToggle] = React.useState(false)

    function renderNavBar() {
        return (
            
            <View
                style={{
                    flexDirection: 'row',
                    height: 80,
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    paddingHorizontal: SIZES.padding,
                    backgroundColor: COLORS.white,
                }}
            > 
                <View
                    style={{ justifyContent: 'center', width: 30 }}
                  
                >
                   <Image source={{uri: "https://storage.jewheart.com/content/users/avatars/1606/avatar_1606_500.jpg?1558623487"}}
                        style={{ width: 50, height:50, borderRadius: AVATAR_SIZE, marginRight: SPACING / 2}}
                            
                        />
                </View>

                <TouchableOpacity
                    style={{ justifyContent: 'center', alignItems: 'flex-end', width: 50 ,bottom:10}}
                    onPress={() => console.log('More')}
                >
                    <Image
                        source={icons.menu}
                        style={{
                            width: 30,
                            height: 30,
                            tintColor: COLORS.primary
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
<StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle={statusBarStyle}
        showHideTransition={statusBarTransition}
        hidden={hidden} />

    function renderHeader() {
        return (

            
            <View style={{ paddingHorizontal: SIZES.padding, paddingVertical: SIZES.padding, backgroundColor: COLORS.white }}>
                <View>
                    <Text style={{ color: COLORS.primary, fontFamily: "monospace", fontSize: SIZES.h2, lineHeight: 30, fontWeight: "bold"}}>SIST STUDENT COUNT</Text>
                    <Text style={{ fontFamily: "serif", fontSize:  13, lineHeight: 22 , color: COLORS.darkgray }}>Keep track of the number of students every day</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: SIZES.padding, alignItems: 'center' }}>
                    <TouchableOpacity style={{
                        backgroundColor: COLORS.lightGray,
                        height: 50,
                        width: 50,
                        borderRadius: 25,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}     onPress={() => openConfirmationAlert()} >
                        <Image
                            source={icons.calendar}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.lightBlue
                            }}
                        />
                    </TouchableOpacity>

                    <View style={{ marginLeft: SIZES.padding }}>
                        <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>Good Morning,</Text>
                        <Text style={{ fontSize:15, color: COLORS.darkgray, fontWeight:"bold" , fontFamily: "monospace"}}>Santhana Kumar M</Text>
                    </View>
                </View>
            </View>
        )
    }

    function renderCategoryHeaderSection() {
        return (
            <View style={{ flexDirection: 'row', padding: SIZES.padding, justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Title */}
                <View>
                    <Text style={{ color: COLORS.primary, fontFamily: "serif", fontSize: SIZES.h3, lineHeight: 22, fontWeight: 'bold'}}>STUDENT COUNT</Text>
                    <Text style={{ color: COLORS.darkgray, ...FONTS.body4 }}>Today</Text>
                </View>

                {/* Button */}
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: viewMode == "chart" ? COLORS.secondary : null,
                            height: 50,
                            width: 50,
                            borderRadius: 25
                        }}
                        onPress={() => setViewMode("chart")}
                    >
                        <Image
                            source={icons.chart}
                            resizeMode="contain"
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: viewMode == "chart" ? COLORS.white : COLORS.darkgray,
                            }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: viewMode == "list" ? COLORS.secondary : null,
                            height: 50,
                            width: 50,
                            borderRadius: 25,
                            marginLeft: SIZES.base
                        }}
                        onPress={() => setViewMode("list")}
                    >
                        <Image
                            source={icons.menu}
                            resizeMode="contain"
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: viewMode == "list" ? COLORS.white : COLORS.darkgray,
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function renderCategoryList() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                onPress={() => setSelectedCategory(item)}
               
            >
                
                
            </TouchableOpacity>
        )

        return (
            <View >
            
            </View>
        )
    }

    function renderIncomingExpensesTitle() {
        return (
            <View style={{ height: 80, backgroundColor: COLORS.lightGray2, padding: SIZES.padding }}>
            
              <View style={{
                width: 300,
                marginRight: SIZES.padding,
           
                marginVertical: SIZES.radius,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.white,
                ...styles.shadow
            }}>
                {/* Title */}
                <View style={{ flexDirection: 'row', padding: SIZES.padding, alignItems: 'center' }}>
                    <View
                        style={{
                            height: 50,
                            width: 50,
                            borderRadius: 25,
                            backgroundColor: COLORS.lightGray,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: SIZES.base
                        }}
                    >
                     
                      <Image source={{uri: "https://storage.jewheart.com/content/users/avatars/1606/avatar_1606_500.jpg?1558623487"}}
                        style={{ width: 50, height:50, borderRadius: AVATAR_SIZE, marginRight: SPACING / 2}}
                  
                       />

                    </View>

                    <Text style={{ ...FONTS.h3,  }}>Intended duration</Text>
                </View>

                {/* Expense Description */}
                <View style={{ paddingHorizontal: SIZES.padding }}>
                    <Text style={{ ...FONTS.body3, flexWrap: 'wrap', color: COLORS.darkgray }}>
                    The form must be filled out and submitted by 9:30 am.
                    </Text>

                 
                
                </View>
                

                {/* Price */}
                <View
                    style={{
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderBottomStartRadius: SIZES.radius,
                        borderBottomEndRadius: SIZES.radius,
                      
                    }}
                >
                   
                </View>
            </View>
            
            </View>
        )
    }

    function renderIncomingExpenses() {
        let allExpenses = selectedCategory ? selectedCategory.expenses : []
        let incomingExpenses = allExpenses.filter(a => a.status == "P")

        const renderItem = ({ item, index }) => (
            <View style={{
                width: 300,
                marginRight: SIZES.padding,
                marginLeft: index == 0 ? SIZES.padding : 0,
                marginVertical: SIZES.radius,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.white,
                ...styles.shadow
            }}>
                {/* Title */}
                <View style={{ flexDirection: 'row', padding: SIZES.padding, alignItems: 'center' }}>
                    <View
                        style={{
                            height: 50,
                            width: 50,
                            borderRadius: 25,
                            backgroundColor: COLORS.lightGray,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: SIZES.base
                        }}
                    >
                        <Image
                            source={selectedCategory.icon}
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: selectedCategory.color
                            }}
                        />
                    </View>

                    <Text style={{ ...FONTS.h3, color: selectedCategory.color, }}>title</Text>
                </View>

                

                {/* Expense Description */}
                <View style={{ paddingHorizontal: SIZES.padding }}>
                    {/* Title and description */}
                    <Text style={{ ...FONTS.h2, }}>any idea</Text>
                    <Text style={{ ...FONTS.body3, flexWrap: 'wrap', color: COLORS.darkgray }}>
                    Do complete before 9:30 
                    </Text>

                 
                    <View
                        style={{
                            height: 50,
                            width: 50,
                            borderRadius: 25,
                            backgroundColor: COLORS.lightGray,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: SIZES.base
                        }}
                    >
                        <Image
                            source={selectedCategory.icon}
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: selectedCategory.color
                            }}
                        />
                    </View>

                    <Text style={{ ...FONTS.h3,  }}>title</Text>

                </View>

               
                </View>
       
        )
        

        return (
            <View>
                {renderIncomingExpensesTitle()}

                {
                    incomingExpenses.length > 0 &&
                    <FlatList
                        data={incomingExpenses}
                        renderItem={renderItem}
                        keyExtractor={item => `${item.id}`}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                }

                {
                    incomingExpenses.length == 0 &&
                    <View style={{ alignItems: 'center', justifyContent: 'center', height: 300 }}>
                        
                    </View>
                }

            </View>

        )
    }

    function processCategoryDataToDisplay() {
        // Filter expenses with "Confirmed" status
        let chartData = categories.map((item) => {
            let confirmExpenses = item.expenses.filter(a => a.status == "C")
            var total = confirmExpenses.reduce((a, b) => a + (b.total || 0), 0)

            return {
                name: item.name,
                y: total,
                expenseCount: confirmExpenses.length,
                color: item.color,
                id: item.id
            }
        })

        // filter out categories with no data/expenses
        let filterChartData = chartData.filter(a => a.y > 0)

        // Calculate the total expenses
        let totalExpense = filterChartData.reduce((a, b) => a + (b.y || 0), 0)

        // Calculate percentage and repopulate chart data
        let finalChartData = filterChartData.map((item) => {
            let percentage = (item.y / totalExpense * 100).toFixed(0)
            return {
                label: `${percentage}%`,
                y: Number(item.y),
                expenseCount: item.expenseCount,
                color: item.color,
                name: item.name,
                id: item.id
            }
        })

        return finalChartData
    }

    function setSelectCategoryByName(name) {
        let category = categories.filter(a => a.name == name)
        setSelectedCategory(category[0])
    }

    function renderChart() {

        let chartData = processCategoryDataToDisplay()
        let colorScales = chartData.map((item) => item.color)
        let totalExpenseCount = chartData.reduce((a, b) => a + (b.expenseCount || 0), 0)

        console.log("Check Chart")
        console.log(chartData)

        if(Platform.OS == 'ios')
        {
            return (
                <View  style={{ alignItems: 'center', justifyContent: 'center' }}>
                    
    
                    <View style={{ position: 'absolute', top: '42%', left: "42%" }}>
                        <Text style={{ ...FONTS.h1, textAlign: 'center' }}>{totalExpenseCount}</Text>
                        <Text style={{ ...FONTS.body3, textAlign: 'center' }}>Expensssses</Text>
                    </View>
                </View>
    
            )
        }
        else
        {
            // Android workaround by wrapping VictoryPie with SVG
            return (
                <View  style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Svg width={SIZES.width} height={SIZES.width} style={{width: "100%", height: "auto"}}>

                        <VictoryPie
                            standalone={false} // Android workaround
                            data={[
    { x: [totalGirlsCount], y: 25 },
    { x: [totalBoysCount], y: 40 },
  
  ]}
 
                           
                            radius={({ datum }) => (selectedCategory && selectedCategory.name == datum.name) ? SIZES.width * 0.4 : SIZES.width * 0.4 - 10}
                            innerRadius={70}
                            labelRadius={({ innerRadius }) => (SIZES.width * 0.4 + innerRadius) / 2.5}
                            style={{
                                labels: { fill: "black", fontSize: 15 },
                                parent: {
                                    ...styles.shadow
                                },
                            }}
                            width={SIZES.width}
                            height={SIZES.width}
                            colorScale={colorScales}
                           
                                    
                                
                            
        
                        />
                    </Svg>
                    <View style={{ position: 'absolute', top: '42%', left: "38%" }}>
                        <Text style={{ ...FONTS.h1, textAlign: 'center' }}>{results}</Text>
                        <Text style={{ ...FONTS.body3, textAlign: 'center' }}>Total Student</Text>
                    </View>
                </View>
            )
        }
        
    }

  

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.lightGray2 }}>
            {/* Nav bar section */}
            {renderNavBar()}

            {/* Header section */}
            {renderHeader()}

            {/* Category Header Section */}
            {renderCategoryHeaderSection()}

            <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
                {
                    viewMode == "list" &&
                    <View>
                        {renderCategoryList()}
                        {renderIncomingExpenses()}
                    </View>
                }
                {
                    viewMode == "chart" &&
                    <View>
                        {renderChart()}
                       
                    </View>
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    }
})

export default Home;

#!/usr/bin/env bash
echo "***** appcenter-pre-build.sh execution started *******"
# Example: Change isBeta to false when building master branch
# if [ "$APPCENTER_BRANCH" == "master" ];
# then
#     # sed -i '' 's/IS_BETA: true,/IS_BETA: false,/' app/util/Constants.js
#     # sed -i '' 's/PROVISIONING_PROFILE_SPECIFIER = "Vincari AdHoc Profile";/PROVISIONING_PROFILE_SPECIFIER = "Vincari AppStore Profile";/' ios/Vincari.xcodeproj/project.pbxproj
# fi


sed -i '' 's/this.view._component/this.view.getNode()/' node_modules/react-native-safe-area-view/index.js
# cp _Files/RCTUIImageViewAnimated.m node_modules/react-native/Libraries/Image/
# cp _Files/PasscodeAuth.podspec node_modules/react-native-passcode-auth/
sed -i '' 's/style: Animated.Text.propTypes.style/\/\/ style: Animated.Text.propTypes.style/' node_modules/react-native-material-textfield/src/components/affix/index.js
sed -i '' 's/style: Animated.Text.propTypes.style/\/\/ style: Animated.Text.propTypes.style/' node_modules/react-native-material-textfield/src/components/label/index.js
sed -i '' 's/style: Animated.Text.propTypes.style/\/\/ style: Animated.Text.propTypes.style/' node_modules/react-native-material-textfield/src/components/helper/index.js
echo "***** appcenter-pre-build.sh executed successfully *******"
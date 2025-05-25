import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { CustomButtonProps } from "@/types";

const CustomButton = ({
  containerStyle,
  iconRight = <ChevronRight size={20} color="#0961F5" />,
  onPress,
  title,
  textStyle = "text-white text-center font-semibold ",
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className={`flex-row items-center  justify-between text-center rounded-full py-2 px-8 ${containerStyle}`}
    >
      <Text className={`font-semibold text-lg   ${textStyle}`}>
        {title}
      </Text>

      <View className="ml-3 w-10 h-10 rounded-full bg-white items-center justify-center">
        {iconRight}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;

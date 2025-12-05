// CreditCardScreen.js
import React, { useState, useMemo, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ImageBackground,
  ScrollView,
  Animated,
  Easing,
  useWindowDimensions,
} from "react-native";

const CARD_BACKGROUNDS_BASE =
  "https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/";
const CARD_BRANDS_BASE =
  "https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/";

const AMEX_MASK = "#### ###### #####";
const OTHER_MASK = "#### #### #### ####";

const randomBackground = () => Math.floor(Math.random() * 25) + 1;

export default function CreditCardScreen() {
  const { width } = useWindowDimensions();
  const isSmall = width < 480; // when true, CVV goes below Expiration

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardMonth, setCardMonth] = useState("");
  const [cardYear, setCardYear] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [currentBg] = useState(randomBackground);
  const flipAnim = useRef(new Animated.Value(0)).current;

  const minCardYear = new Date().getFullYear();
  const currentYearTwoDigits = String(minCardYear).slice(2, 4);

  const cardType = useMemo(() => {
    const number = cardNumber.replace(/\s/g, "");

    if (/^4/.test(number)) return "visa";
    if (/^(34|37)/.test(number)) return "amex";
    if (/^5[1-5]/.test(number)) return "mastercard";
    if (/^6011/.test(number)) return "discover";
    if (/^9792/.test(number)) return "troy";

    return "visa"; // default
  }, [cardNumber]);

  const cardNumberMask = useMemo(
    () => (cardType === "amex" ? AMEX_MASK : OTHER_MASK),
    [cardType]
  );

  const formattedCardNumber = useMemo(() => {
    const digits = cardNumber.replace(/\D/g, "");
    const maskChars = cardNumberMask.split("");
    const result = [];

    for (let i = 0, d = 0; i < maskChars.length; i++) {
      const m = maskChars[i];
      if (m === "#") {
        if (d < digits.length) {
          const shouldMask =
            cardType === "amex"
              ? i > 4 && i < 14
              : i > 4 && i < 15;
          result.push(shouldMask ? "*" : digits[d]);
          d++;
        } else {
          result.push("•");
        }
      } else {
        result.push(m);
      }
    }

    return result.join("");
  }, [cardNumber, cardNumberMask, cardType]);

  const cardBrandSource = useMemo(() => {
    if (!cardType) return null;
    return { uri: `${CARD_BRANDS_BASE}${cardType}.png` };
  }, [cardType]);

  const bgSource = useMemo(
    () => ({
      uri: `${CARD_BACKGROUNDS_BASE}${currentBg}.jpeg`,
    }),
    [currentBg]
  );

  const handleFlip = (showBack) => {
    Animated.timing(flipAnim, {
      toValue: showBack ? 1 : 0,
      duration: 400,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "360deg"],
  });

  const cardHolderDisplay =
    cardName.trim().length > 0 ? cardName.toUpperCase() : "FULL NAME";

  const expiryMonthDisplay = cardMonth || "MM";
  const expiryYearDisplay =
    cardYear && cardYear.length >= 2
      ? cardYear.slice(-2)
      : currentYearTwoDigits;

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <View style={styles.cardForm}>
        {/* Card preview */}
        <View style={styles.cardList}>
          <View style={styles.cardItem}>
            {/* FRONT */}
            <Animated.View
              style={[
                styles.cardSide,
                styles.cardSideFront,
                {
                  transform: [
                    { perspective: 1000 },
                    { rotateY: frontInterpolate },
                  ],
                },
              ]}
            >
              <ImageBackground
                source={bgSource}
                resizeMode="cover"
                style={styles.cardBg}
                imageStyle={styles.cardBgImg}
              >
                <View style={styles.cardOverlay} />
                <View style={styles.cardWrapper}>
                  <View style={styles.cardTop}>
                    <Image
                      source={{
                        uri:
                          "https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png",
                      }}
                      style={styles.cardChip}
                    />
                    <View style={styles.cardType}>
                      {cardBrandSource && (
                        <Image
                          source={cardBrandSource}
                          style={styles.cardTypeImg}
                          resizeMode="contain"
                        />
                      )}
                    </View>
                  </View>

                  <View style={styles.cardNumberWrapper}>
                    <Text style={styles.cardNumberText}>
                      {formattedCardNumber}
                    </Text>
                  </View>

                  <View style={styles.cardContent}>
                    <View style={styles.cardInfo}>
                      <Text style={styles.cardHolderLabel}>Card Holder</Text>
                      <Text style={styles.cardNameText}>
                        {cardHolderDisplay}
                      </Text>
                    </View>

                    <View style={styles.cardDateWrapper}>
                      <Text style={styles.cardDateTitle}>Expires</Text>
                      <View style={styles.cardDateRow}>
                        <Text style={styles.cardDateItem}>
                          {expiryMonthDisplay}
                        </Text>
                        <Text style={styles.cardDateSlash}>/</Text>
                        <Text style={styles.cardDateItem}>
                          {expiryYearDisplay}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </Animated.View>

            {/* BACK */}
            <Animated.View
              style={[
                styles.cardSide,
                styles.cardSideBack,
                {
                  transform: [
                    { perspective: 1000 },
                    { rotateY: backInterpolate },
                  ],
                },
              ]}
            >
              <ImageBackground
                source={bgSource}
                resizeMode="cover"
                style={styles.cardBg}
                imageStyle={styles.cardBgImg}
              >
                <View style={styles.cardOverlay} />
                <View style={styles.cardBand} />
                <View style={styles.cardCvvSection}>
                  <Text style={styles.cardCvvTitle}>CVV</Text>
                  <View style={styles.cardCvvBand}>
                    <Text style={styles.cardCvvText}>
                      {"*".repeat(cardCvv.length || 3)}
                    </Text>
                  </View>
                  <View style={styles.cardTypeBack}>
                    {cardBrandSource && (
                      <Image
                        source={cardBrandSource}
                        style={styles.cardTypeImg}
                        resizeMode="contain"
                      />
                    )}
                  </View>
                </View>
              </ImageBackground>
            </Animated.View>
          </View>
        </View>

        {/* Form */}
        <View style={styles.formInner}>
          {/* Card Number */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Card Number</Text>
            <TextInput
              style={styles.input}
              value={cardNumber}
              onChangeText={(text) => {
                const onlyDigits = text.replace(/\D/g, "");
                let grouped = "";
                for (let i = 0; i < onlyDigits.length; i++) {
                  if (i !== 0 && i % 4 === 0) grouped += " ";
                  grouped += onlyDigits[i];
                }
                setCardNumber(grouped.slice(0, 19));
              }}
              keyboardType="number-pad"
              placeholder="1234 5678 9012 3456"
              onFocus={() => handleFlip(false)}
            />
          </View>

          {/* Card Holder */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Card Holder</Text>
            <TextInput
              style={styles.input}
              value={cardName}
              onChangeText={setCardName}
              placeholder="Full Name"
              autoCapitalize="words"
              onFocus={() => handleFlip(false)}
            />
          </View>

          {/* Row: Expiration (left) + CVV (right / below when small) */}
          <View
            style={[
              styles.rowGroup,
              isSmall && styles.rowGroupStack,
            ]}
          >
            {/* Left: Expiration Date (MM + YYYY, always row) */}
            <View
              style={[
                styles.rowGroupLeft,
                isSmall && styles.rowGroupLeftFull,
              ]}
            >
              <Text style={styles.inputLabel}>Expiration Date</Text>
              <View style={styles.expRow}>
                <TextInput
                  style={[styles.input, styles.expInput, styles.expInputLeft]}
                  value={cardMonth}
                  onChangeText={(text) =>
                    setCardMonth(text.replace(/\D/g, "").slice(0, 2))
                  }
                  placeholder="MM"
                  keyboardType="number-pad"
                  onFocus={() => handleFlip(false)}
                />
                <TextInput
                  style={[styles.input, styles.expInput]}
                  value={cardYear}
                  onChangeText={(text) =>
                    setCardYear(text.replace(/\D/g, "").slice(0, 4))
                  }
                  placeholder="YYYY"
                  keyboardType="number-pad"
                  onFocus={() => handleFlip(false)}
                />
              </View>
            </View>

            {/* Right: CVV */}
            <View
              style={[
                styles.rowGroupRight,
                isSmall && styles.rowGroupRightFull,
              ]}
            >
              <Text style={styles.inputLabel}>CVV</Text>
              <TextInput
                style={styles.input}
                value={cardCvv}
                onChangeText={(text) =>
                  setCardCvv(text.replace(/\D/g, "").slice(0, 3))
                }
                placeholder="123"
                keyboardType="number-pad"
                onFocus={() => handleFlip(true)}
                onBlur={() => handleFlip(false)}
              />
            </View>
          </View>

          {/* Submit (no functionality) */}
          <View style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    backgroundColor: "#ddeefc",
    padding: 16,
    justifyContent: "center",
  },
  cardForm: {
    maxWidth: 570,
    width: "100%",
    alignSelf: "center",
  },
  cardList: {
    marginBottom: -130,
  },
  cardItem: {
    maxWidth: 430,
    height: 270,
    alignSelf: "center",
    width: "100%",
  },
  cardSide: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "#0e2a5a",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },
  cardSideFront: {
    zIndex: 2,
  },
  cardSideBack: {
    zIndex: 1,
  },
  cardBg: {
    flex: 1,
  },
  cardBgImg: {
    width: "100%",
    height: "100%",
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(6,2,29,0.45)",
  },
  cardWrapper: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  cardChip: {
    width: 50,
    height: 40,
    resizeMode: "contain",
  },
  cardType: {
    height: 40,
    width: 80,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  cardTypeImg: {
    width: "100%",
    height: "100%",
  },
  cardNumberWrapper: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  cardNumberText: {
    fontFamily: "Courier",
    fontSize: 20,
    color: "#fff",
    letterSpacing: 2,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  cardInfo: {
    maxWidth: "60%",
  },
  cardHolderLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    marginBottom: 4,
  },
  cardNameText: {
    color: "#fff",
    fontSize: 16,
  },
  cardDateWrapper: {
    alignItems: "flex-end",
  },
  cardDateTitle: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    marginBottom: 4,
  },
  cardDateRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardDateItem: {
    color: "#fff",
    fontSize: 16,

    textAlign: "center",
  },
  cardDateSlash: {
    color: "#fff",
    fontSize: 16,
    marginHorizontal: 4,
  },
  cardBand: {
    marginTop: 30,
    height: 50,
    backgroundColor: "rgba(0,0,19,0.8)",
  },
  cardCvvSection: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 15,
  },
  cardCvvTitle: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 4,
    textAlign: "right",
  },
  cardCvvBand: {
    backgroundColor: "#fff",
    borderRadius: 4,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  cardCvvText: {
    color: "#1a3b5d",
    fontSize: 18,
  },
  cardTypeBack: {
    alignItems: "flex-end",
    opacity: 0.8,
  },

  formInner: {
    backgroundColor: "#fff",
    marginTop: 160,
    padding: 24,
    borderRadius: 10,
    shadowColor: "#5a7494",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 8,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1a3b5d",
    marginBottom: 4,
  },
  input: {
    height: 48,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ced6e0",
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "transparent",
  },

  // Row: Expiration + CVV
  rowGroup: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  rowGroupStack: {
    flexDirection: "column",
  },
  rowGroupLeft: {
    flex: 1,
    marginRight: 16,
  },
  rowGroupLeftFull: {
    marginRight: 0,
    marginBottom: 12,
  },
  rowGroupRight: {
    width: 140,
  },
  rowGroupRightFull: {
    width: "100%",
  },

  // Month + Year row (always a row)
  expRow: {
    flexDirection: "row",
  },
  expInput: {
    flex: 1,
    width:"100%",
  },
  expInputLeft: {
    marginRight: 10,
  },

  submitButton: {
    marginTop: 16,
    height: 55,
    borderRadius: 5,
    backgroundColor: "#2364d2",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2364d2",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },
});

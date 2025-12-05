package com.example.kotlin_compose  // <-- use your own package name

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.graphics.RectangleShape
import com.example.kotlin_compose.ui.theme.Kotlin_composeTheme // <-- adjust to your theme import
import com.example.kotlin_compose.R

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            Kotlin_composeTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = Color.White
                ) {
                    KotlinComposeExampleScreen()
                }
            }
        }
    }
}

@Composable
fun KotlinComposeExampleScreen() {
    val topBarColor = Color(0xFF00796B)
    val buttonGrey = Color(0xFFE0E0E0)
    val underlinePink = Color(0xFFE91E63)

    var email by remember { mutableStateOf("") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.White)
    ) {
        // Top bar
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(56.dp)
                .background(topBarColor),
            contentAlignment = Alignment.CenterStart
        ) {
            Text(
                text = "Example 3: Kotlin + Compose",
                color = Color.White,
                fontSize = 20.sp,
                fontWeight = FontWeight.SemiBold,
                modifier = Modifier.padding(start = 16.dp)
            )
        }

        // Content
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 24.dp, vertical = 32.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            // Image
            Image(
                painter = painterResource(id = R.drawable.fireboyy),
                contentDescription = "Decorative donut image",
                modifier = Modifier
                    .size(180.dp)
                    .padding(bottom = 40.dp)
            )

            // 2x2 button grid
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(bottom = 32.dp)
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(bottom = 16.dp),
                    horizontalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    GreySquareButton("BUTTON", buttonGrey, Modifier.weight(1f))
                    GreySquareButton("BUTTON", buttonGrey, Modifier.weight(1f))
                }

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    GreySquareButton("BUTTON", buttonGrey, Modifier.weight(1f))
                    GreySquareButton("BUTTON", buttonGrey, Modifier.weight(1f))
                }
            }

            // Email row: label + input + underline
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.Bottom
            ) {
                Text(
                    text = "Email",
                    fontSize = 16.sp,
                    color = Color(0xFF666666),
                    modifier = Modifier.padding(end = 8.dp)
                )

                Column(
                    modifier = Modifier.weight(1f)
                ) {
                    BasicTextField(
                        value = email,
                        onValueChange = { email = it },
                        textStyle = TextStyle(
                            fontSize = 16.sp,
                            color = Color.Black
                        ),
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(bottom = 4.dp)
                    )
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(2.dp)
                            .background(underlinePink)
                    )
                }
            }
        }
    }
}

@Composable
fun GreySquareButton(
    text: String,
    backgroundColor: Color,
    modifier: Modifier = Modifier
) {
    Button(
        onClick = { /* no-op, UI only */ },
        modifier = modifier.height(48.dp),
        shape = RectangleShape, // square corners
        colors = ButtonDefaults.buttonColors(
            containerColor = backgroundColor,
            contentColor = Color.Black
        ),
        contentPadding = PaddingValues(0.dp)
    ) {
        Box(
            modifier = Modifier.fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            Text(
                text = text,
                fontSize = 16.sp,
                fontWeight = FontWeight.SemiBold
            )
        }
    }
}

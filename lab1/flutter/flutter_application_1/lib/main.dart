import 'package:flutter/material.dart';

void main() {
  runApp(const FlutterExampleApp());
}

class FlutterExampleApp extends StatelessWidget {
  const FlutterExampleApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Example 4: Flutter',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        scaffoldBackgroundColor: Colors.white,
      ),
      home: const ExampleFlutterScreen(),
    );
  }
}

class ExampleFlutterScreen extends StatefulWidget {
  const ExampleFlutterScreen({super.key});

  @override
  State<ExampleFlutterScreen> createState() => _ExampleFlutterScreenState();
}

class _ExampleFlutterScreenState extends State<ExampleFlutterScreen> {
  final TextEditingController _emailController = TextEditingController();

  @override
  void dispose() {
    _emailController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    const topBarColor = Color(0xFF00796B);
    const buttonGrey = Color(0xFFE0E0E0);
    const underlinePink = Color(0xFFE91E63);

    return Scaffold(
      appBar: AppBar(
        backgroundColor: topBarColor,
        title: const Text(
          'Example 4: Flutter',
          style: TextStyle(
            color: Colors.white,
            fontSize: 20,
            fontWeight: FontWeight.w600,
          ),
        ),
        centerTitle: false,
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 32.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              // Image
              SizedBox(
                width: 180,
                height: 180,
                child: Image.asset(
                  'fireboyy.png',
                  fit: BoxFit.contain,
                ),
              ),
              const SizedBox(height: 40),

              // 2x2 button grid
              Column(
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: _GreySquareButton(
                          text: 'BUTTON',
                          color: buttonGrey,
                        ),
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: _GreySquareButton(
                          text: 'BUTTON',
                          color: buttonGrey,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  Row(
                    children: [
                      Expanded(
                        child: _GreySquareButton(
                          text: 'BUTTON',
                          color: buttonGrey,
                        ),
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: _GreySquareButton(
                          text: 'BUTTON',
                          color: buttonGrey,
                        ),
                      ),
                    ],
                  ),
                ],
              ),

              const SizedBox(height: 32),

              // Email row: label + text field with underline
              Row(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  const Text(
                    'Email',
                    style: TextStyle(
                      fontSize: 16,
                      color: Color(0xFF666666),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        TextField(
                          controller: _emailController,
                          keyboardType: TextInputType.emailAddress,
                          decoration: const InputDecoration(
                            isDense: true,
                            contentPadding: EdgeInsets.only(bottom: 4),
                            border: InputBorder.none,
                          ),
                          style: const TextStyle(fontSize: 16),
                        ),
                        Container(
                          height: 2,
                          width: double.infinity,
                          color: underlinePink,
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _GreySquareButton extends StatelessWidget {
  final String text;
  final Color color;

  const _GreySquareButton({
    required this.text,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 48,
      child: TextButton(
        onPressed: () {
          // no-op, UI only
        },
        style: TextButton.styleFrom(
          backgroundColor: color,
          foregroundColor: Colors.black,
          shape: const RoundedRectangleBorder(
            borderRadius: BorderRadius.zero, // square corners
          ),
        ),
        child: Text(
          text,
          style: const TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
    );
  }
}

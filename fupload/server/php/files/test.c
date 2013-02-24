#include <stdio.h>
const char *prefix = "";
int main(int argc, char* argv[]) { 
for (int i = 0; i < 10; i++) {
        printf("%s%s", prefix, "hello");
        prefix = ", ";
}
}

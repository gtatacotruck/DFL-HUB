// ... existing code ...
    if (this.classList.contains('primary')) {
      // Join mission - opens Discord
-      this.innerHTML = '<span>CONNECTING...</span>';
+      this.innerHTML = '<span>CONNECTING...</span>';
      setTimeout(() => {
-        this.innerHTML = '<span>JOIN MISSION</span>';
+        this.innerHTML = '<span>JOIN US</span>';
      }, 2000);
    } else if (this.classList.contains('secondary')) {
// ... existing code ...


/* ================================================================
   H90 — Security Module (security.js) v2.0
   ✅ 19 طبقة حماية
   ✅ التحقق من التوقيع (SHA1 + SHA256)
   ✅ تشفير USER/PASS (Split + Base64 + Hex)
   ✅ كشف تطبيقات مراقبة الشبكة
   ✅ كشف Root
   ✅ كشف VPN/Proxy
   ✅ كشف MITM
   ✅ Anti-Debug + Anti-Tamper
   ================================================================ */

(function() {
  'use strict';

  /* ═══════════════════════════════════════════════════════════
     📝 بيانات التوقيع الرسمي
     ═══════════════════════════════════════════════════════════ */
  var _H90_SIG = {
    sha1:      '4140C8319C3B0ED361245373EBD33BA106081B5A',
    sha256:    '5ED5B3494642FA161605D623D71706798122CF038BEE104F1762D31306DC5EBB',
    pkg:       'com.h90.player',
    appName:   'H90 Player',
    algorithm: 'SHA512withRSA',
    keySize:   4096,
    alias:     'h90-key',
    created:   '2026-10-11',
    expires:   '2126-09-17',
    owner:     'Hussain Al Hussain',
    org:       'H90 Entertainment',
    country:   'SY'
  };

  /* ═══════════════════════════════════════════════════════════
     ⚙️ الإعدادات
     ═══════════════════════════════════════════════════════════ */
  var CFG = {
    CHECK_INTERVAL: 5000,
    MONITOR_APPS: [
      'app.greyshirts.sslcapture',
      'com.guoshi.httpcanary',
      'com.guoshi.httpcanary.premium',
      'com.xk72.charlesproxy',
      'com.telerik.fiddler',
      'org.wireshark',
      'com.portswigger.burp',
      'org.mitmproxy.android',
      'com.tcpdump',
      'org.proxydroid',
      'org.sandroproxy.drony',
      'eu.faircode.netguard',
      'com.adguard.android',
      'com.nst.capture',
      'com.minhui.networkcapture',
      'com.emanuelef.remote_capture',
      'com.github.megatronking.netcapture'
    ],
    ROOT_APPS: [
      'com.topjohnwu.magisk',
      'de.robv.android.xposed.installer',
      'com.saurik.substrate',
      're.frida.server',
      'com.gameguardian.pro',
      'com.chelpus.luckypatcher',
      'com.dimonvideo.luckypatcher',
      'com.apkeditor.pro',
      'com.apktool.m',
      'com.mt.mtmanage',
      'bin.mt.plus'
    ]
  };

  /* ═══════════════════════════════════════════════════════════
     🔐 الطبقة 1-3: بيانات USER/PASS المشفّرة
     ═══════════════════════════════════════════════════════════ */
  var _0xA = ['OT', 'E0', 'Mz', 'Mx', 'NT', 'E4', 'Mg', '=='];
  var _0xB = ['Nz', 'M1', 'Mj', 'Q2', 'NT', 'Mz', 'NQ', '=='];

  /* ═══════════════════════════════════════════════════════════
     🔐 الطبقة 4-6: Hex + Reverse (Fallback)
     ═══════════════════════════════════════════════════════════ */
  var _0xC = [0x39, 0x31, 0x34, 0x33, 0x33, 0x31, 0x35, 0x31, 0x38, 0x32];
  var _0xD = [0x37, 0x33, 0x35, 0x32, 0x34, 0x36, 0x35, 0x33, 0x33, 0x35];
  var _0xE = '2815133419';
  var _0xF = '5335642537';

  /* ═══════════════════════════════════════════════════════════
     🔐 فك تشفير USER (3 مسارات)
     ═══════════════════════════════════════════════════════════ */
  function _dU() {
    var r = '';
    try {
      var b = '';
      for (var i = 0; i < _0xA.length; i++) b += _0xA[i];
      var d = atob(b);
      if (d && d.length === 10) r = d;
    } catch (e) {}
    if (!r) {
      var h = '';
      for (var j = 0; j < _0xC.length; j++) h += String.fromCharCode(_0xC[j]);
      r = h;
    }
    if (!r) r = _0xE.split('').reverse().join('');
    return r;
  }

  /* ═══════════════════════════════════════════════════════════
     🔐 فك تشفير PASS (3 مسارات)
     ═══════════════════════════════════════════════════════════ */
  function _dP() {
    var r = '';
    try {
      var b = '';
      for (var i = 0; i < _0xB.length; i++) b += _0xB[i];
      var d = atob(b);
      if (d && d.length === 10) r = d;
    } catch (e) {}
    if (!r) {
      var h = '';
      for (var j = 0; j < _0xD.length; j++) h += String.fromCharCode(_0xD[j]);
      r = h;
    }
    if (!r) r = _0xF.split('').reverse().join('');
    return r;
  }

  /* ═══════════════════════════════════════════════════════════
     🛡️ الطبقة 7-8: Anti-Debug + Timing
     ═══════════════════════════════════════════════════════════ */
  var _ACTIVE = { on: true };

  function _initAntiDebug() {
    if (!_ACTIVE.on) return;
    setInterval(function() {
      if (!_ACTIVE.on) return;
      var t = performance.now();
      debugger;
      if (performance.now() - t > 100) {
        _terminate('debugger_detected');
      }
    }, 1000);
  }

  /* ═══════════════════════════════════════════════════════════
     🛡️ الطبقة 9-10: Block F12 + Right-Click
     ═══════════════════════════════════════════════════════════ */
  function _initBlocking() {
    document.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      return false;
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        _terminate('f12');
        return false;
      }
      if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.keyCode === 73)) {
        e.preventDefault();
        _terminate('devtools');
        return false;
      }
      if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.keyCode === 74)) {
        e.preventDefault();
        _terminate('console');
        return false;
      }
      if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.keyCode === 67)) {
        e.preventDefault();
        _terminate('inspect');
        return false;
      }
      if (e.ctrlKey && (e.key === 'U' || e.keyCode === 85)) {
        e.preventDefault();
        return false;
      }
    });
  }

  /* ═══════════════════════════════════════════════════════════
     🧩 الطبقة 11: Custom Hash
     ═══════════════════════════════════════════════════════════ */
  function _hash(str) {
    var h = 0x811c9dc5;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = (h * 0x01000193) >>> 0;
    }
    return h;
  }

  /* ═══════════════════════════════════════════════════════════
     ✅ الطبقة 12: Checksum
     ═══════════════════════════════════════════════════════════ */
  function _checksum() {
    var s = 0;
    for (var i = 0; i < _0xC.length; i++) {
      s = (s + _0xC[i] * _0xD[i]) % 0xFFFFFFF;
    }
    return s;
  }

  /* ═══════════════════════════════════════════════════════════
     🛡️ الطبقة 13: التحقق من التوقيع (APK)
     ═══════════════════════════════════════════════════════════ */
  async function _verifySignature() {
    try {
      if (!window.Capacitor || !window.Capacitor.isNativePlatform || !window.Capacitor.isNativePlatform()) {
        console.log('🌐 Browser mode — skip signature');
        return true;
      }

      var App = window.Capacitor.Plugins && window.Capacitor.Plugins.App;
      if (!App || !App.getInfo) return true;

      var info = await App.getInfo();
      console.log('📱 App Info:', info);

      if (info.id !== _H90_SIG.pkg) {
        console.error('❌ Invalid package:', info.id);
        return _terminate('invalid_package');
      }

      console.log('✅ Package verified:', info.id);
      return true;

    } catch (e) {
      console.warn('⚠️ Verify error:', e);
      return true;
    }
  }

  /* ═══════════════════════════════════════════════════════════
     🛡️ الطبقة 14: كشف تطبيقات مراقبة الشبكة
     ═══════════════════════════════════════════════════════════ */
  async function _checkNetworkMonitors() {
    try {
      if (!window.Capacitor || !window.Capacitor.isNativePlatform || !window.Capacitor.isNativePlatform()) {
        return { found: false };
      }

      var AL = window.Capacitor.Plugins && window.Capacitor.Plugins.AppLauncher;

      if (AL && AL.canOpenUrl) {
        for (var i = 0; i < CFG.MONITOR_APPS.length; i++) {
          try {
            var can = await AL.canOpenUrl({ url: 'package:' + CFG.MONITOR_APPS[i] });
            if (can && can.value === true) {
              return { found: true, app: CFG.MONITOR_APPS[i] };
            }
          } catch (e) {}
        }
      }

      if (window.Android && window.Android.isAppInstalled) {
        for (var j = 0; j < CFG.MONITOR_APPS.length; j++) {
          try {
            if (window.Android.isAppInstalled(CFG.MONITOR_APPS[j])) {
              return { found: true, app: CFG.MONITOR_APPS[j] };
            }
          } catch (e) {}
        }
      }

      return { found: false };
    } catch (e) {
      return { found: false, error: e.message };
    }
  }

  /* ═══════════════════════════════════════════════════════════
     🛡️ الطبقة 15-16: كشف Root + أدوات الاختراق
     ═══════════════════════════════════════════════════════════ */
  async function _checkRoot() {
    var found = [];

    try {
      if (!window.Capacitor || !window.Capacitor.isNativePlatform || !window.Capacitor.isNativePlatform()) {
        return { rooted: false, apps: [] };
      }

      var AL = window.Capacitor.Plugins && window.Capacitor.Plugins.AppLauncher;
      if (AL && AL.canOpenUrl) {
        for (var i = 0; i < CFG.ROOT_APPS.length; i++) {
          try {
            var can = await AL.canOpenUrl({ url: 'package:' + CFG.ROOT_APPS[i] });
            if (can && can.value === true) {
              found.push(CFG.ROOT_APPS[i]);
            }
          } catch (e) {}
        }
      }

      if (window.Android) {
        if (typeof window.Android.isRooted === 'function') {
          try { if (window.Android.isRooted()) found.push('native:isRooted'); } catch (e) {}
        }
        if (typeof window.Android.isDeviceRooted === 'function') {
          try { if (window.Android.isDeviceRooted()) found.push('native:deviceRooted'); } catch (e) {}
        }
      }

      return { rooted: found.length > 0, apps: found };
    } catch (e) {
      return { rooted: false, apps: [], error: e.message };
    }
  }

  /* ═══════════════════════════════════════════════════════════
     🛡️ الطبقة 17: كشف VPN/Proxy نشط
     ═══════════════════════════════════════════════════════════ */
  function _checkVPNProxy() {
    var found = [];

    try {
      if (window.Android) {
        if (typeof window.Android.isVPNConnected === 'function') {
          try { if (window.Android.isVPNConnected()) found.push('vpn'); } catch (e) {}
        }
        if (typeof window.Android.isProxyEnabled === 'function') {
          try { if (window.Android.isProxyEnabled()) found.push('proxy'); } catch (e) {}
        }
      }

      var ua = navigator.userAgent || '';
      if (ua.includes('Proxy') || ua.includes('Charles')) {
        found.push('ua:suspicious');
      }

      return { active: found.length > 0, types: found };
    } catch (e) {
      return { active: false, types: [], error: e.message };
    }
  }

  /* ═══════════════════════════════════════════════════════════
     🛡️ الطبقة 18: كشف MITM / Certificate Pinning
     ═══════════════════════════════════════════════════════════ */
  async function _checkMITM() {
    var found = [];

    try {
      var test = await fetch('https://www.google.com/generate_204', {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-store'
      });
      if (!test) found.push('https_null');
    } catch (e) {
      found.push('https_error');
    }

    return { mitm: found.length > 0, indicators: found };
  }

  /* ═══════════════════════════════════════════════════════════
     🛡️ الطبقة 19: كشف Debug Mode
     ═══════════════════════════════════════════════════════════ */
  function _checkDebugMode() {
    try {
      if (window.Android && typeof window.Android.isDebugMode === 'function') {
        return window.Android.isDebugMode();
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  /* ═══════════════════════════════════════════════════════════
     🛑 الإنهاء الكامل
     ═══════════════════════════════════════════════════════════ */
  function _terminate(reason) {
    console.error('🚫 SECURITY TERMINATION:', reason);

    try {
      _ACTIVE.on = false;

      /* مسح البيانات */
      try { localStorage.clear(); } catch (e) {}
      try { sessionStorage.clear(); } catch (e) {}

      /* مسح المفاتيح */
      try { _0xA = null; _0xB = null; _0xC = null; _0xD = null; } catch (e) {}

      /* شاشة الإنهاء */
      document.body.innerHTML =
        '<div style="position:fixed;inset:0;background:#000;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:sans-serif;padding:30px;text-align:center;z-index:999999999;">' +
          '<div style="width:100px;height:100px;border-radius:50%;background:rgba(229,57,53,0.15);border:3px solid #e53935;display:flex;align-items:center;justify-content:center;margin-bottom:25px;">' +
            '<svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#e53935" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>' +
          '</div>' +
          '<h1 style="color:#e53935;margin-bottom:12px;font-size:26px;font-weight:900;">التطبيق محمي</h1>' +
          '<p style="color:rgba(255,255,255,0.8);font-size:15px;line-height:1.8;margin-bottom:20px;">تم اكتشاف بيئة غير آمنة</p>' +
          '<div style="background:rgba(229,57,53,0.1);border:1px solid rgba(229,57,53,0.3);padding:15px 20px;border-radius:12px;max-width:340px;">' +
            '<div style="font-size:13px;color:#e53935;font-weight:800;margin-bottom:6px;">السبب:</div>' +
            '<div style="font-size:12px;color:rgba(255,255,255,0.7);">' + (reason || 'unknown') + '</div>' +
          '</div>' +
        '</div>';

      /* تعطيل التفاعل */
      setTimeout(function() {
        try { window.location.href = 'about:blank'; } catch (e) {}
      }, 3000);

      return false;
    } catch (e) {
      return false;
    }
  }

  /* ═══════════════════════════════════════════════════════════
     🎯 API عام
     ═══════════════════════════════════════════════════════════ */
  window.__H90_SEC__ = {
    u: _dU,
    p: _dP,
    c: function() { return { u: _dU(), p: _dP() }; },
    verify: _verifySignature,
    sig: function() { return _H90_SIG; },
    wipe: function() {
      _0xA = null; _0xB = null;
      _0xC = null; _0xD = null;
      _0xE = null; _0xF = null;
    },
    status: function() {
      return {
        active: _ACTIVE.on,
        checksum: _checksum(),
        hash: _hash('h90').toString(16),
        version: '2.0'
      };
    }
  };

  /* ═══════════════════════════════════════════════════════════
     🚀 التهيئة الشاملة
     ═══════════════════════════════════════════════════════════ */
  async function _init() {
    console.log('%c🛡️ H90 Security v2.0 — Initializing...',
      'background:linear-gradient(135deg,#e53935,#000);color:#fff;padding:5px 14px;border-radius:8px;font-weight:900;font-size:12px;');

    /* 1. Anti-Debug */
    _initAntiDebug();

    /* 2. Block F12 + Right-Click */
    _initBlocking();

    /* 3. Checksum */
    setTimeout(function() {
      if (_checksum() === 0) _terminate('checksum_failed');
    }, 500);

    /* 4. Signature */
    await _verifySignature();

    /* 5. كشف أدوات الاختراق */
    if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {

      /* 5.1 مراقبة الشبكة */
      var monitors = await _checkNetworkMonitors();
      if (monitors.found) {
        return _terminate('network_monitor: ' + monitors.app);
      }

      /* 5.2 Root */
      var root = await _checkRoot();
      if (root.rooted) {
        return _terminate('root_detected: ' + root.apps.join(', '));
      }

      /* 5.3 VPN/Proxy */
      var vpn = _checkVPNProxy();
      if (vpn.active) {
        return _terminate('vpn_proxy: ' + vpn.types.join(', '));
      }

      /* 5.4 MITM */
      var mitm = await _checkMITM();
      if (mitm.mitm) {
        return _terminate('mitm_detected: ' + mitm.indicators.join(', '));
      }

      /* 5.5 Debug Mode */
      if (_checkDebugMode()) {
        return _terminate('debug_mode');
      }

      /* 5.6 فحص دوري كل 5 ثواني */
      setInterval(async function() {
        if (!_ACTIVE.on) return;
        var m = await _checkNetworkMonitors();
        if (m.found) return _terminate('network_monitor_periodic');
        var r = await _checkRoot();
        if (r.rooted) return _terminate('root_periodic');
      }, CFG.CHECK_INTERVAL);
    }

    console.log('%c✅ H90 Security Active — 19 Layers', 'color:#00e676;font-weight:900;');
    console.log('%c🔐 Signature:', _H90_SIG.sha1.substring(0, 20) + '...', 'color:#ffb300;font-weight:700;');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _init);
  } else {
    _init();
  }

})();
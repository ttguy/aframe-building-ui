//https://unpkg.com/aframe-slice9-component@1.0.0/dist/aframe-slice9-component.min.js
!(function (t) {
  function e(a) {
    if (i[a]) return i[a].exports;
    var r = (i[a] = { exports: {}, id: a, loaded: !1 });
    return t[a].call(r.exports, r, r.exports, e), (r.loaded = !0), r.exports;
  }
  var i = {};
  return (e.m = t), (e.c = i), (e.p = ""), e(0);
})([
  function (t, e) {
    function i(t) {
      switch (t) {
        case "back":
          return THREE.BackSide;
        case "double":
          return THREE.DoubleSide;
        default:
          return THREE.FrontSide;
      }
    }
    if ("undefined" == typeof AFRAME)
      throw new Error(
        "Component attempted to register before AFRAME was available."
      );
    AFRAME.registerComponent("slice9", {
      schema: {
        width: { default: 1, min: 0 },
        height: { default: 1, min: 0 },
        left: { default: 0, min: 0 },
        right: { default: 0, min: 0 },
        bottom: { default: 0, min: 0 },
        top: { default: 0, min: 0 },
        side: { default: "front", oneOf: ["front", "back", "double"] },
        padding: { default: 0.1, min: 0.01 },
        color: { type: "color", default: "#fff" },
        opacity: { default: 1, min: 0, max: 1 },
        transparent: { default: !0 },
        debug: { default: !1 },
        src: { type: "map" },
      },
      multiple: !1,
      init: function () {
        var t = this.data,
          e = (this.material = new THREE.MeshBasicMaterial({
            color: t.color,
            opacity: t.opacity,
            transparent: t.transparent,
            wireframe: t.debug,
          })),
          i = (this.geometry = new THREE.PlaneBufferGeometry(
            t.width,
            t.height,
            3,
            3
          ));
        new THREE.TextureLoader();
        (this.plane = new THREE.Mesh(i, e)),
          this.el.setObject3D("mesh", this.plane),
          (this.textureSrc = null);
      },
      updateMap: function () {
        function t(t) {
          (this.material.map = t),
            (this.material.needsUpdate = !0),
            this.regenerateMesh();
        }
        var e = this.data.src;
        if (e) {
          if (e === this.textureSrc) return;
          return (
            (this.textureSrc = e),
            void this.el.sceneEl.systems.material.loadTexture(
              e,
              { src: e },
              t.bind(this)
            )
          );
        }
        this.material.map && t(null);
      },
      regenerateMesh: function () {
        function t(t, e, i) {
          (a[3 * t] = e), (a[3 * t + 1] = i);
        }
        function e(t, e, i) {
          (r[2 * t] = e), (r[2 * t + 1] = i);
        }
        var i = this.data,
          a = this.geometry.attributes.position.array,
          r = this.geometry.attributes.uv.array,
          n = this.material.map.image;
        if (n) {
          var o = {
            left: i.left / n.width,
            right: i.right / n.width,
            top: i.top / n.height,
            bottom: i.bottom / n.height,
          };
          e(1, o.left, 1),
            e(2, o.right, 1),
            e(4, 0, o.bottom),
            e(5, o.left, o.bottom),
            e(6, o.right, o.bottom),
            e(7, 1, o.bottom),
            e(8, 0, o.top),
            e(9, o.left, o.top),
            e(10, o.right, o.top),
            e(11, 1, o.top),
            e(13, o.left, 0),
            e(14, o.right, 0);
          var s = i.width / 2,
            d = i.height / 2,
            h = -s + i.padding,
            l = s - i.padding,
            u = d - i.padding,
            f = -d + i.padding;
          t(0, -s, d),
            t(1, h, d),
            t(2, l, d),
            t(3, s, d),
            t(4, -s, u),
            t(5, h, u),
            t(6, l, u),
            t(7, s, u),
            t(8, -s, f),
            t(9, h, f),
            t(10, l, f),
            t(11, s, f),
            t(13, h, -d),
            t(14, l, -d),
            t(12, -s, -d),
            t(15, s, -d),
            (this.geometry.attributes.position.needsUpdate = !0),
            (this.geometry.attributes.uv.needsUpdate = !0);
        }
      },
      update: function (t) {
        var e = this.data;
        this.material.color.setStyle(e.color),
          (this.material.opacity = e.opacity),
          (this.material.transparent = e.transparent),
          (this.material.wireframe = e.debug),
          (this.material.side = i(e.side));
        var a = AFRAME.utils.diff(e, t);
        "src" in a
          ? this.updateMap()
          : ("width" in a ||
              "height" in a ||
              "padding" in a ||
              "left" in a ||
              "top" in a ||
              "bottom" in a ||
              "right" in a) &&
            this.regenerateMesh();
      },
      remove: function () {},
      pause: function () {},
      play: function () {},
    });
  },
]);

<template>
  <div class="code-viewer">
    <textarea ref="textarea" />
  </div>
</template>

<script>
import CodeMirror from 'codemirror'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/idea.css'
require('script-loader!jsonlint')
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/xml/xml'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/json-lint'

export default {
  name: 'CodeViewer',
  /* eslint-disable vue/require-prop-types */
  props: {
    value: {
      require: true,
      default: function() {
        return {}
      }
    },
    lineNumbers: {
      type: Boolean,
      require: false,
      default: true
    },
    theme: {
      type: String,
      require: false,
      default: 'idea'
    }
  },
  data() {
    return {
      codeViewer: false
    }
  },
  computed: {
    isXml() {
      return typeof this.value === 'string' && /^<[0-9a-z]+>/gi.test(this.value)
    }
  },
  watch: {
    value(value) {
      const editor_value = this.codeViewer.getValue()
      if (value !== editor_value) {
        this.setValue()
      }
    }
  },
  mounted() {
    this.codeViewer = CodeMirror.fromTextArea(this.$refs.textarea, {
      lineNumbers: this.lineNumbers,
      mode: this.isXml ? 'application/xml' : 'application/json',
      gutters: ['CodeMirror-lint-markers'],
      theme: this.theme,
      lineWrapping: true,
      lint: true,
      readOnly: true
    })
    this.setValue()
    this.codeViewer.on('change', cm => {
      this.$emit('changed', cm.getValue())
      this.$emit('input', cm.getValue())
    })
  },
  methods: {
    setValue() {
      if (this.isXml) {
        this.codeViewer.setValue(this.value)
      } else {
        var json = typeof this.value === 'string' ? JSON.parse(this.value) : this.value
        this.codeViewer.setValue(JSON.stringify(json, null, 2))
      }
    },
    getValue() {
      return this.codeViewer.getValue()
    }
  }
}
</script>

<style scoped>
.json-editor {
  height: 100%;
  position: relative;
  line-height: 1.5;
}
.json-editor >>> .CodeMirror {
  height: auto;
  min-height: 300px;
}
.json-editor >>> .CodeMirror-scroll {
  min-height: 300px;
}
.json-editor >>> .cm-s-rubyblue span.cm-string {
  color: #f08047;
}
</style>

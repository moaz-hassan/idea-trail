// ImageNode.js
import React from 'react';
import { DecoratorNode } from 'lexical';
import Image from 'next/image';

export function $createImageNode({ src, alt, maxWidth }) {
  return new ImageNode(src, alt, maxWidth);
}

export function $isImageNode(node) {
  return node instanceof ImageNode;
}

export class ImageNode extends DecoratorNode {
  __src;
  __alt;
  __maxWidth;

  static getType() {
    return 'image';
  }

  static clone(node) {
    return new ImageNode(node.__src, node.__alt, node.__maxWidth, node.__key);
  }

  constructor(src, alt, maxWidth, key) {
    super(key);
    this.__src = src;
    this.__alt = alt;
    this.__maxWidth = maxWidth;
  }

  createDOM() {
    const div = document.createElement('div');
    div.style.display = 'block';
    div.style.margin = '16px 0';
    div.className = 'image-node-container';
    return div;
  }

  updateDOM() {
    return false;
  }

  getSrc() {
    return this.__src;
  }

  getAlt() {
    return this.__alt;
  }

  setAlt(alt) {
    const writable = this.getWritable();
    writable.__alt = alt;
  }

  decorate() {
    return (
      <div className="my-4">
        <Image
          src={this.__src}
          alt={this.__alt}
          width={this.__maxWidth || 800}
          height={0}
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
          className="mx-auto"
        />
        {this.__alt && (
          <p className="text-center text-sm text-gray-600 mt-2 italic">
            {this.__alt}
          </p>
        )}
      </div>
    );
  }

  static importJSON(serializedNode) {
    const { src, alt, maxWidth } = serializedNode;
    return $createImageNode({ src, alt, maxWidth });
  }

  exportJSON() {
    return {
      src: this.__src,
      alt: this.__alt,
      maxWidth: this.__maxWidth,
      type: 'image',
      version: 1,
    };
  }
}
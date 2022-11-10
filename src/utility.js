export const toFixed = (num, fractionDigits = 0) => {
  num = Number(num);
  if (num === 0) return num.toFixed(fractionDigits);
  const fixedNum = num.toFixed(fractionDigits);
  if (fixedNum === 0) return toFixed(num, fractionDigits + 1);
  return fixedNum;
};

export const numberWithCommas = (x, fractionDigits) => {
  const [naturalPart, decimalPart] = x.toString().split(".");
  let out = naturalPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (decimalPart) {
    if (!isNumeric(fractionDigits)) {
      out += "." + decimalPart;
    } else if (decimalPart.length >= fractionDigits) {
      out += "." + decimalPart.substr(0, fractionDigits);
    } else {
      out +=
        "." + decimalPart + "0".repeat(fractionDigits - decimalPart.length);
    }
  }
  return out;
};

export default function formatNumberAfterComma(n) {
  const v = n.toString().replace(/\.(0*)([^0])([0-9])\d*/, (g1, g2, g3, g4) => {
    return "." + g2 + (+g4 < 5 ? +g3 : +g3 + 1);
  });
  return +v;
}

export const compactNumber = (value, fractionDigits = 1) => {
  const suffixes = ["", "k", "m", "b", "t"];
  const suffixNum = Math.floor((("" + parseInt(value)).length - 1) / 3);
  let shortValue = parseFloat(
    (value / Math.pow(1000, suffixNum)).toPrecision(fractionDigits + 1)
  );
  if (shortValue % 1 !== 0) shortValue = shortValue.toFixed(fractionDigits);
  return shortValue + suffixes[suffixNum];
};

export const formatAddress = (address, fractionDigits = 3) => {
  try {
    return (
      address.slice(0, fractionDigits) + "..." + address.slice(-fractionDigits)
    );
  } catch (error) {
    return undefined;
  }
};

export const isNumeric = (num) => {
  return !isNaN(num) && !isNaN(parseFloat(num));
};

export const isObject = (item) => {
  return (
    item && typeof item === "object" && !Array.isArray(item) && item != null
  );
};

export function formatNumber(number, options) {
  const {
    fallback = "---",
    fractionDigits,
    delimiter,
    padZero,
    prefix,
    suffix,
  } = options ?? {};

  if (!isNumeric(number)) {
    return fallback;
  }

  let num = parseFloat(number);
  if (isNumeric(fractionDigits)) {
    num = num.toFixed(fractionDigits);
  }
  if (!padZero) {
    num = Number(num); // remove last zeros
  }
  return (prefix ?? "") + numberWithCommas(num, delimiter) + (suffix ?? "");
}

export const splitDecimalNumber = (number) => {
  if (number === 0) return [1, "0", ""];
  else {
    let num = number;
    let sign = 1;
    if (number < 0) {
      num = -number;
      sign = -1;
    }
    const _split = String(num).split(".");
    return [sign, _split[0], _split[1]];
  }
};

export function decimalAdjust(type, value, exp) {
  // If the exp is undefined or zero...
  if (typeof exp === "undefined" || +exp === 0) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;
  // If the value is not a number or the exp is not an integer...
  if (isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) {
    return NaN;
  }
  // If the value is negative...
  if (value < 0) {
    return -decimalAdjust(type, -value, exp);
  }
  // Shift
  value = value.toString().split("e");
  value = Math[type](+(value[0] + "e" + (value[1] ? +value[1] - exp : -exp)));
  // Shift back
  value = value.toString().split("e");
  return +(value[0] + "e" + (value[1] ? +value[1] + exp : exp));
}

export const hexToRgb = (hex) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getNonce = () => {
  const len1 = random(2, 10);
  let _to = 3;
  Array(len1)
    .fill(0)
    .forEach((_) => {
      return (_to = _to * random(2, 10));
    });
  return random(2, _to);
};

// export const web3Authenticate = async (message, accountAddress) => {
//   try {
//     const _mes = Web3.utils.toHex(message);
//     return {
//       message: await web3Sender.eth.personal.sign(_mes, accountAddress),
//       error: undefined,
//     };
//   } catch (error) {
//     return {
//       message: undefined,
//       error,
//     };
//   }
// };

export function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }
  return mergeDeep(target, ...sources);
}

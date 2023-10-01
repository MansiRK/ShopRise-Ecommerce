/* eslint-disable array-callback-return */
/* eslint-disable implicit-arrow-linebreak */
const braintree = require("braintree");
const dotenv = require("dotenv");
const db = require("../database");

dotenv.config();

// Payment gateway
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

const braintreeToken = (req, res) => {
  gateway.clientToken.generate({}, (error, result) => {
    if (error) {
      res.status(500).json({
        message: `Failed to generate braintree token. ${error.message} `,
      });
    } else {
      res.status(200).json({
        message: "Generated braintree token successfully",
        braintreeToken: result,
      });
    }
  });
};

const payment = (req, res) => {
  const { cart, nonce } = req.body;

  let total = 0;
  cart.map((item) => {
    total += item.product_price;
  });

  console.log(req.user.user_id);
  console.log(total);

  const productId = cart.map((item) => item.product_id).join(", ");
  const userId = req.user.user_id;
  console.log(userId);

  // eslint-disable-next-line function-paren-newline
  const newTransaction = gateway.transaction.sale(
    {
      amount: total,
      paymentMethodNonce: nonce,
      options: {
        submitForSettlement: true,
      },
    },
    (error, result) => {
      if (result) {
        const orderQuery = `INSERT INTO orders (payment, productId, buyer, total_amount) VALUES (
            '${nonce}', ${productId}, ${userId}, ${total})`;

        db.query(orderQuery, (orderError, orderResults) => {
          if (orderError) {
            res.status(500).json({
              message: `Error in inserting order. ${orderError.message}`,
              success: false,
            });
          } else {
            res.status(200).json({
              message: "Payment successful",
              success: true,
              order: orderResults,
            });
          }
        });
      } else {
        res.status(500).json({
          message: `Payment failed. ${error.message}`,
        });
      }
      // eslint-disable-next-line comma-dangle
    }
    // eslint-disable-next-line function-paren-newline
  );
};

module.exports = {
  braintreeToken,
  payment,
};

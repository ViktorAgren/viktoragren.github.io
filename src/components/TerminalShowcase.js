import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Terminal, Activity, Clock } from "lucide-react";

export const TerminalShowcase = () => {
  const [command, setCommand] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const outputRef = useRef(null);
  const inputRef = useRef(null);
  const [output, setOutput] = useState([
    {
      type: "info",
      content: [
        "Welcome to Trading Terminal v1.0.0",
        'Type "help" to see available commands',
        'Type "trade start" to begin simulation',
      ],
    },
  ]);
  const [priceData, setPriceData] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(100);
  const [isTrading, setIsTrading] = useState(false);
  const [volatility, setVolatility] = useState(0.001);
  const lastPriceRef = useRef(100);
  const trendRef = useRef(0);
  const [portfolio, setPortfolio] = useState({
    cash: 100000,
    positions: {},
    history: [],
  });

  // price movements
  const generateNewPrice = useCallback(() => {
    const momentum = 0.7;
    const meanReversion = 0.1;
    const basePrice = 100;

    trendRef.current =
      momentum * trendRef.current +
      (1 - momentum) *
        ((Math.random() - 0.5) * volatility +
          (meanReversion * (basePrice - lastPriceRef.current)) / basePrice);

    const newPrice = lastPriceRef.current * (1 + trendRef.current);
    lastPriceRef.current = newPrice;
    return newPrice;
  }, [volatility]);

  // price data
  useEffect(() => {
    const initialData = [];
    let lastPrice = 100;

    for (let i = 0; i < 100; i++) {
      lastPrice = lastPrice * (1 + (Math.random() - 0.5) * 0.002);
      initialData.push({
        time: i,
        price: lastPrice,
        timestamp: new Date(Date.now() - (100 - i) * 1000).toLocaleTimeString(),
      });
    }

    setPriceData(initialData);
    lastPriceRef.current = lastPrice;
    setCurrentPrice(lastPrice);
  }, []);

  // price updates
  useEffect(() => {
    if (isTrading) {
      const interval = setInterval(() => {
        setPriceData((prevData) => {
          const newPrice = generateNewPrice();
          setCurrentPrice(newPrice);

          const newData = [
            ...prevData.slice(1),
            {
              time: prevData[prevData.length - 1].time + 1,
              price: newPrice,
              timestamp: new Date().toLocaleTimeString(),
            },
          ];

          if (Math.random() < 0.05) {
            setVolatility((prev) => prev * (Math.random() < 0.5 ? 1.5 : 0.7));
          }

          return newData;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isTrading, generateNewPrice]);

  // Auto-scroll terminal output
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const formatPrice = (price) => price.toFixed(2);
  const formatQuantity = (qty) => qty.toFixed(4);

  const executeTrade = (type, amount) => {
    const quantity = amount / currentPrice;
    const newPortfolio = { ...portfolio };

    if (type === "buy") {
      if (amount > portfolio.cash) {
        return "Insufficient funds";
      }
      newPortfolio.cash -= amount;
      newPortfolio.positions.BTC = (newPortfolio.positions.BTC || 0) + quantity;
    } else {
      const currentQuantity = portfolio.positions.BTC || 0;
      if (quantity > currentQuantity) {
        return "Insufficient position";
      }
      newPortfolio.cash += amount;
      newPortfolio.positions.BTC = currentQuantity - quantity;
    }

    newPortfolio.history.push({
      type,
      price: currentPrice,
      quantity,
      amount,
      timestamp: new Date().toLocaleTimeString(),
    });

    setPortfolio(newPortfolio);
    return `${type.toUpperCase()} ${formatQuantity(quantity)} BTC at $${formatPrice(currentPrice)}`;
  };

  const commands = {
    help: () => ({
      type: "info",
      content: [
        "Trading Commands:",
        "trade start  - Start trading simulation",
        "trade stop   - Stop trading simulation", 
        "buy amount   - Buy BTC (e.g., buy 1000)",
        "sell amount  - Sell BTC (e.g., sell 1000)",
        "portfolio    - View current portfolio",
        "history     - View trade history",
        "clear       - Clear terminal",
        "",
        "Use arrow keys (↑↓) to navigate command history",
      ],
    }),
    trade: (args) => {
      if (args === "start") {
        setIsTrading(true);
        return {
          type: "info",
          content: "Trading simulation started",
        };
      } else if (args === "stop") {
        setIsTrading(false);
        return {
          type: "info",
          content: "Trading simulation stopped",
        };
      }
    },
    buy: (amount) => ({
      type: "trade",
      content: executeTrade("buy", parseFloat(amount)),
    }),
    sell: (amount) => ({
      type: "trade",
      content: executeTrade("sell", parseFloat(amount)),
    }),
    portfolio: () => ({
      type: "portfolio",
      content: {
        cash: portfolio.cash,
        positions: portfolio.positions,
        total: portfolio.cash + (portfolio.positions.BTC || 0) * currentPrice,
      },
    }),
    history: () => ({
      type: "history",
      content: portfolio.history,
    }),
    clear: () => {
      setOutput([]);
      return null;
    },
  };

  const handleCommand = (e) => {
    e.preventDefault();
    const [cmd, ...args] = command.trim().toLowerCase().split(" ");

    // Add to command history
    if (command.trim()) {
      setCommandHistory((prev) => [command, ...prev.slice(0, 49)]); // Keep last 50 commands
      setHistoryIndex(-1);
    }

    setOutput((prev) => [
      ...prev,
      { type: "command", content: `> ${command}` },
    ]);

    if (commands[cmd]) {
      const result = commands[cmd](args.join(" "));
      if (result) {
        setOutput((prev) => [...prev, result]);
      }
    } else if (command.trim()) {
      setOutput((prev) => [
        ...prev,
        {
          type: "error",
          content: `Command not found: ${command}. Type 'help' for available commands.`,
        },
      ]);
    }

    setCommand("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCommand(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommand(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCommand("");
      }
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-900 border border-green-500 p-2 text-xs">
          <p className="text-green-500">Price: ${data.price.toFixed(2)}</p>
          <p className="text-green-400">{data.timestamp}</p>
        </div>
      );
    }
    return null;
  };

  const renderOutput = (item) => {
    switch (item.type) {
      case "command":
        return <div className="text-green-500">{item.content}</div>;
      case "error":
        return <div className="text-red-500">{item.content}</div>;
      case "trade":
        return <div className="text-yellow-500">{item.content}</div>;
      case "portfolio":
        return (
          <div className="border border-green-900 p-2">
            <div className="text-green-500">Portfolio Summary:</div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div>Cash: ${formatPrice(item.content.cash)}</div>
              <div>BTC: {formatQuantity(item.content.positions.BTC || 0)}</div>
              <div>Total Value: ${formatPrice(item.content.total)}</div>
            </div>
          </div>
        );
      case "history":
        return (
          <div className="border border-green-900 p-2">
            <div className="text-green-500 mb-2">Trade History:</div>
            {item.content.map((trade, idx) => (
              <div key={idx} className="text-xs grid grid-cols-4 gap-2">
                <span>{trade.timestamp}</span>
                <span
                  className={
                    trade.type === "buy" ? "text-green-500" : "text-red-500"
                  }
                >
                  {trade.type.toUpperCase()}
                </span>
                <span>{formatQuantity(trade.quantity)} BTC</span>
                <span>${formatPrice(trade.price)}</span>
              </div>
            ))}
          </div>
        );
      default:
        return (
          <div className="text-white">
            {Array.isArray(item.content)
              ? item.content.map((line, idx) => <div key={idx}>{line}</div>)
              : item.content}
          </div>
        );
    }
  };

  // color
  const priceChange =
    priceData.length > 1
      ? priceData[priceData.length - 1].price -
        priceData[priceData.length - 2].price
      : 0;

  const chartColor = priceChange >= 0 ? "#22c55e" : "#ef4444";

  return (
    <section id="trading" className="min-h-screen bg-black text-green-500 font-mono py-20">
      <div className="container mx-auto px-4">
        {/* Terminal Header */}
        <div className="border border-green-900 p-2 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal size={14} />
            <span className="text-xs">
              TRADING_TERMINAL <span className="text-green-600">{`<F1>`}</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Activity size={14} />
              <span className="text-xs">
                {isTrading ? "LIVE TRADING" : "SYSTEM IDLE"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} />
              <span className="text-xs">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        {/* Price Chart */}
        <div className="border border-green-900 bg-black p-4 mb-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs">BTC/USD</span>
            <div className="flex items-center gap-4">
              <span
                className={`text-sm ${priceChange >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                ${currentPrice.toFixed(2)}
              </span>
              <span
                className={`text-xs ${priceChange >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {priceChange >= 0 ? "▲" : "▼"}
                {Math.abs(priceChange).toFixed(2)}
              </span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceData}>
                <XAxis
                  dataKey="timestamp"
                  interval="preserveStartEnd"
                  tick={{ fontSize: 10, fill: "#6B7280" }}
                  minTickGap={50}
                />
                <YAxis
                  domain={["auto", "auto"]}
                  tick={{ fontSize: 10, fill: "#6B7280" }}
                  orientation="right"
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine
                  y={currentPrice}
                  stroke="#666"
                  strokeDasharray="3 3"
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke={chartColor}
                  dot={false}
                  strokeWidth={1.5}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Terminal Window */}
        <div className="border border-green-900 bg-black p-4">
          <div ref={outputRef} className="h-[30vh] overflow-y-auto space-y-2 mb-4">
            {output.map((item, idx) => (
              <div key={idx} className="mb-2">
                {renderOutput(item)}
              </div>
            ))}
          </div>

          {/* Command Input */}
          <form
            onSubmit={handleCommand}
            className="flex items-center gap-2 border-t border-green-900 pt-4"
          >
            <span className="text-green-500">{">"}</span>
            <input
              ref={inputRef}
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white outline-none"
              placeholder="Type 'help' for available commands..."
              autoFocus
            />
          </form>
        </div>

        {/* Quick Commands */}
        <div className="border border-green-900 mt-4 p-2">
          <div className="text-xs flex items-center justify-between">
            <span>
              Quick commands: trade start, buy 1000, sell 1000, portfolio,
              history
            </span>
            <span className="text-green-600">Press Enter to execute</span>
          </div>
        </div>
      </div>
    </section>
  );
};

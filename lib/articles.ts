export type Exercise = {
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Architect";
  objective: string;
  tasks: string[];
  expectedOutcome: string;
};

export type Question = { q: string; a: string };
export type Section = {
  heading: string;
  body: string[];
  code?: string;
  codeTitle?: string;
  exercises?: Exercise[];
  qa?: Question[];
};
export type Article = {
  slug: string;
  title: string;
  description: string;
  objective: string;
  readTime: string;
  hinglishGuide: string;
  sections: Section[];
};

export const articles: Article[] = [
  {
    "slug": "how-llms-work",
    "title": "How Large Language Models Work — From Text to Token Generation",
    "description": "A deep, first-principles walkthrough of what an LLM learns, what happens inside an inference request, and why next-token prediction can produce useful language.",
    "objective": "By the end, explain the complete request path from prompt to generated response, distinguish model from application, and simulate a tiny next-token decoder in Python.",
    "readTime": "45–60 min study",
    "sections": [
      {
        "heading": "1. First principles: what problem is an LLM solving?",
        "body": [
          "Start with a simple question: what should a machine do when it receives the text “The capital of France is”? A language model learns to assign likelihoods to possible continuations. “Paris” should receive a higher score than an unrelated continuation because patterns in training data make it a plausible next token.",
          "An LLM is a neural network whose parameters have been adjusted during training so that it becomes good at predicting tokens in sequences. It does not normally retrieve a sentence from a database and paste it back. It computes a distribution over possible next tokens conditioned on the context it receives.",
          "Why does next-token prediction lead to broad capabilities? To predict well across diverse text, the model must learn statistical structure: syntax, facts expressed in text, styles, relationships, code patterns and some forms of reasoning-like behavior. These capabilities emerge from learning patterns at scale; they are not separate hard-coded modules for every task.",
          "Important distinction: a model's parameters are not a reliable, queryable database. The model can produce fluent but incorrect statements. Treat its output as generated content that may need grounding, validation or tool-based verification."
        ],
        "exercises": [
          {
            "title": "Explain it without jargon",
            "level": "Beginner",
            "objective": "Check whether the core mental model is clear.",
            "tasks": [
              "Explain in 3–4 sentences what an LLM does when given a prompt.",
              "Explain why next-token prediction can learn grammar and factual associations.",
              "Give one example of a fluent answer that could still be wrong."
            ],
            "expectedOutcome": "You should describe a model that uses context to score possible next tokens, rather than a search engine that looks up guaranteed facts."
          }
        ]
      },
      {
        "heading": "2. Model vs product: ChatGPT is not just a neural network",
        "body": [
          "When a user chats with an AI product, the visible experience includes much more than the model weights. A product typically has a user interface, an application backend, conversation storage or state handling, instruction assembly, model routing, safety controls, tool integrations, logging and usage limits.",
          "Think in layers. The model is the prediction engine. The orchestration/application layer decides what request to send, which context to include, whether a tool should be called and how to handle the response. The product layer manages identity, user experience, permissions and business workflows.",
          "This distinction matters for architects. If a user asks the assistant to read a private document, the model should not decide whether that user is authorized. The application must enforce access control before retrieving and sending document content. A prompt that says “do not reveal confidential data” is not an authorization system.",
          "An enterprise AI solution should therefore separate policy enforcement from language generation. Use deterministic code for authentication, authorization, tenant isolation, quotas and audit requirements. Use the model for language understanding and generation within those boundaries."
        ],
        "exercises": [
          {
            "title": "Draw the product boundary",
            "level": "Intermediate",
            "objective": "Separate probabilistic model behavior from deterministic application responsibilities.",
            "tasks": [
              "Draw a request path for an employee asking a company assistant a question.",
              "Place identity verification, document authorization, retrieval, prompt assembly, model call and response rendering in order.",
              "Mark which steps must be enforced by application code rather than trusted to a prompt."
            ],
            "expectedOutcome": "Authorization and tenant filtering happen before private content reaches the model; the model generates an answer from approved context."
          }
        ]
      },
      {
        "heading": "3. The complete inference lifecycle",
        "body": [
          "Step 1 — Request construction: the application combines system/developer instructions, conversation context, the current user message and any approved retrieved evidence. The exact message format is model/provider-specific.",
          "Step 2 — Tokenization: text is converted into token IDs. A token can be a word, part of a word, punctuation or another text unit. The model consumes IDs, not raw human-readable strings.",
          "Step 3 — Embedding: token IDs are mapped to vectors. These vectors are numerical representations that the neural network can process. Positional information is also introduced so the network can represent sequence order.",
          "Step 4 — Transformer processing: repeated layers update token representations using attention and feed-forward computations. In a decoder-only language model, causal masking ensures a position cannot use future tokens when predicting the next token.",
          "Step 5 — Logits: the final representation for the current generation position is projected to vocabulary-sized scores. These unnormalized scores are called logits.",
          "Step 6 — Decoding: a decoding strategy converts scores into a selected next token. Greedy decoding chooses the highest-scoring token; sampling can choose probabilistically. Temperature and other sampling controls influence the distribution.",
          "Step 7 — Autoregressive loop: the selected token is appended to the context and the model predicts again. Generation stops at an end token, stop sequence, output limit or application-defined condition.",
          "Step 8 — Post-processing: the application may validate structured output, apply safety checks, execute permitted tool calls, record usage and return the response to the user. Tool execution should be controlled by application policy, not by blindly executing arbitrary model text."
        ],
        "exercises": [
          {
            "title": "Reconstruct an inference trace",
            "level": "Beginner",
            "objective": "Memorize the flow by reasoning through one request.",
            "tasks": [
              "Take the prompt “Explain RAG in simple terms”.",
              "Write down what happens before the model receives the request.",
              "Describe what the model returns at the logits stage.",
              "Explain why generation repeats after selecting one token.",
              "List two things the application may do after generation."
            ],
            "expectedOutcome": "A correct sequence includes message assembly, tokenization, embeddings/positions, transformer layers, logits, decoding, repeated generation and application post-processing."
          },
          {
            "title": "Failure-point analysis",
            "level": "Architect",
            "objective": "Think about production failure modes at each boundary.",
            "tasks": [
              "For each lifecycle step, identify one possible failure or risk.",
              "Add a timeout and retry policy where appropriate; avoid retrying non-idempotent tool actions blindly.",
              "Identify where token usage, latency and model/provider errors should be measured.",
              "Explain what the user should see if the model provider is unavailable."
            ],
            "expectedOutcome": "You should be able to map failures to the layer responsible for handling them instead of treating every failure as an LLM problem."
          }
        ]
      },
      {
        "heading": "4. Hands-on lab: implement softmax and temperature",
        "body": [
          "We will not call a real model in this first lab. Instead, we will simulate a tiny vocabulary with three candidate next tokens. This isolates the mathematics used during decoding and avoids hiding the logic behind an SDK.",
          "Suppose the model emits logits [2.8, 1.7, 0.9] for candidate tokens [“Paris”, “London”, “Tokyo”]. Logits are not probabilities. Softmax exponentiates the scores and normalizes them so that the probabilities sum to 1.",
          "Temperature rescales logits before softmax. A temperature below 1 makes the distribution sharper, usually giving more probability to the top candidate. A temperature above 1 makes it flatter. Temperature does not add facts, improve reasoning by itself or guarantee correctness.",
          "The implementation subtracts the maximum score before exponentiation. This is a numerical-stability trick: softmax is unchanged by subtracting the same constant from every logit, but the exponentials are less likely to overflow."
        ],
        "codeTitle": "lab_01_softmax.py",
        "code": "import math\n\n\ndef softmax(logits, temperature=1.0):\n    if temperature <= 0:\n        raise ValueError(\"temperature must be greater than zero\")\n\n    scaled = [value / temperature for value in logits]\n    max_value = max(scaled)  # numerical stability\n    exponentials = [math.exp(value - max_value) for value in scaled]\n    denominator = sum(exponentials)\n    return [value / denominator for value in exponentials]\n\n\ncandidates = [\"Paris\", \"London\", \"Tokyo\"]\nlogits = [2.8, 1.7, 0.9]\n\nfor temperature in [0.3, 0.7, 1.0, 1.8]:\n    probabilities = softmax(logits, temperature)\n    print(f\"\\nTemperature: {temperature}\")\n    for token, probability in zip(candidates, probabilities):\n        print(f\"{token:8} {probability:.4f}\")\n    print(\"Probability sum:\", round(sum(probabilities), 6))",
        "exercises": [
          {
            "title": "Experiment A — temperature sweep",
            "level": "Beginner",
            "objective": "Observe how sampling temperature changes probability concentration.",
            "tasks": [
              "Run the code exactly as shown.",
              "Compare the probability of Paris at temperatures 0.3, 1.0 and 1.8.",
              "Verify that probabilities sum to approximately 1 for every temperature.",
              "Change the logits to [1.2, 1.1, 1.0] and repeat."
            ],
            "expectedOutcome": "Lower temperature should make the leading candidate more dominant; higher temperature should make the distribution flatter."
          },
          {
            "title": "Experiment B — implement greedy decoding",
            "level": "Intermediate",
            "objective": "Connect probability distributions to token selection.",
            "tasks": [
              "Write a function that returns the candidate with the highest probability.",
              "Run it for every temperature in the lab.",
              "Explain why greedy selection may return the same token even when probabilities change.",
              "Add input validation for mismatched candidate and logit list lengths."
            ],
            "expectedOutcome": "Greedy decoding selects the maximum-probability candidate. Temperature may change confidence without changing the winning candidate."
          },
          {
            "title": "Experiment C — weighted sampling",
            "level": "Intermediate",
            "objective": "Understand why sampling can produce different continuations.",
            "tasks": [
              "Use Python's random.choices with the softmax probabilities as weights.",
              "Generate 100 selections at temperature 0.5 and then at 1.5.",
              "Count how often each candidate is selected.",
              "Explain why one run is not guaranteed to match another."
            ],
            "expectedOutcome": "Higher temperature generally spreads selections more widely. Sampling is stochastic, so observed counts vary between runs."
          }
        ]
      },
      {
        "heading": "5. Architect view: what must surround the model?",
        "body": [
          "An enterprise inference path needs controls beyond prompt engineering. Identity and authorization determine who can call the service and what data they may access. Rate limits and quotas protect capacity and cost. Request validation bounds input size and rejects unsupported payloads.",
          "Model routing can choose a model based on task complexity, latency target, region, data classification or cost. Timeouts prevent requests from hanging indefinitely. Retries need exponential backoff and jitter, and should be limited to transient failures. Never blindly retry a tool action that may have already completed.",
          "Observability should capture request IDs, model/provider, latency, input and output token counts, status codes, retry counts and safe quality signals. Avoid logging secrets or sensitive prompt content by default. Apply retention and redaction policies.",
          "Quality evaluation is separate from uptime monitoring. A model can return HTTP 200 and still answer incorrectly. Use representative evaluation datasets, human review for high-impact use cases and regression checks when prompts or models change.",
          "Trade-off: a hosted API reduces infrastructure operations but creates provider dependency and data-governance questions. Self-hosting offers more deployment control but transfers GPU capacity, scaling, patching, monitoring and reliability work to your organization."
        ],
        "exercises": [
          {
            "title": "Architect scenario — internal knowledge assistant",
            "level": "Architect",
            "objective": "Design a safe model boundary.",
            "tasks": [
              "An employee asks for a document they may not be allowed to view. Describe the exact point where access is checked.",
              "The model provider returns HTTP 429. Define a safe retry/backoff strategy.",
              "The model returns valid JSON with an incorrect answer. Explain why schema validation is insufficient.",
              "List five telemetry fields that help investigate a slow request without storing sensitive prompt text."
            ],
            "expectedOutcome": "A strong design enforces access before retrieval, handles throttling with bounded backoff, evaluates semantic correctness separately from schema validity and records privacy-aware telemetry."
          }
        ]
      }
    ],
    "hinglishGuide": "Simple way mein socho: LLM next token predict karta hai, lekin useful answer banane ke liye prompt ke context ko repeatedly process karta hai. Is lesson mein hum model ke andar ka flow aur uske around bani application architecture dono samjhenge."
  },
  {
    "slug": "tokenization-context-windows",
    "title": "Tokenization, Embeddings at Input and Context Windows",
    "description": "Understand how text becomes token IDs, why token counts differ from word counts, and how context budgets affect cost and reliability.",
    "objective": "Explain tokenization, vocabulary IDs, embeddings and context-window budgeting; build a small tokenizer simulator and prompt-budget calculator.",
    "readTime": "45–60 min study",
    "sections": [
      {
        "heading": "1. What exactly is a token?",
        "body": [
          "A token is the unit of text processing used by a language model. It is not guaranteed to be one word. Depending on the tokenizer, a token may represent a whole common word, a word fragment, punctuation, whitespace patterns or byte-level material.",
          "Why not simply split on spaces? Because natural language contains morphology, punctuation, rare names, code, URLs, multilingual writing and new words. A subword vocabulary can reuse familiar pieces instead of requiring a separate vocabulary entry for every possible word.",
          "Consider “unbelievable”. A tokenizer might represent it as one token or multiple pieces such as “un”, “believ” and “able”. Exact segmentation depends on the tokenizer and model family. Never teach a fixed rule such as one token equals four characters as if it were exact.",
          "Tokenization affects more than billing. It influences context-window usage, truncation, batching, prompt construction and latency. The same semantic content can consume different token counts after formatting changes, JSON wrappers or code inclusion."
        ],
        "exercises": [
          {
            "title": "Token intuition worksheet",
            "level": "Beginner",
            "objective": "Build an intuition without pretending to know exact tokenizer output.",
            "tasks": [
              "Write one sentence in plain English, one in Hinglish, one code snippet and one JSON object.",
              "Predict which examples may tokenize less efficiently and why.",
              "Identify punctuation, uncommon names and repeated whitespace that could affect tokenization.",
              "Explain why exact counts require the tokenizer used by the target model."
            ],
            "expectedOutcome": "You should identify tokenization as model/tokenizer-specific and understand why word counts are only rough estimates."
          }
        ]
      },
      {
        "heading": "2. From text to token IDs and embeddings",
        "body": [
          "A tokenizer converts input text into a sequence of integer IDs from a vocabulary. For example, a fictional tokenizer might map “AI is useful” to [421, 18, 905]. These numbers are identifiers, not meaningful numeric measurements. ID 905 is not “more semantic” than ID 18.",
          "The embedding layer maps each token ID to a learned vector. If the model hidden dimension is 4, a toy embedding table could map token 421 to [0.12, -0.30, 0.44, 0.08]. Real LLM embedding dimensions are much larger.",
          "Why vectors? Neural networks operate on numerical tensors. Learned embeddings let the model transform token identities into representations that can be combined and updated by Transformer layers. Contextual representations change as layers process the sequence; the initial embedding is not the final meaning of a word.",
          "Position information is also required. A bag of token IDs alone does not tell the model whether “dog bites man” differs from “man bites dog”. Positional embeddings or other positional methods provide information about sequence order."
        ],
        "codeTitle": "lab_02_token_ids_and_embeddings.py",
        "code": "# A deliberately tiny, fictional vocabulary and embedding table.\nvocabulary = {\n    \"AI\": 0,\n    \"is\": 1,\n    \"useful\": 2,\n    \"today\": 3,\n}\n\nembedding_table = [\n    [0.10, 0.20, 0.30],\n    [0.00, 0.10, 0.20],\n    [0.40, 0.20, 0.10],\n    [0.30, 0.00, 0.20],\n]\n\ntext = \"AI is useful today\"\ntokens = text.split()  # toy tokenizer: split on spaces only\nids = [vocabulary[token] for token in tokens]\nvectors = [embedding_table[token_id] for token_id in ids]\n\nprint(\"Tokens:\", tokens)\nprint(\"Token IDs:\", ids)\nprint(\"Embedding vectors:\")\nfor token, vector in zip(tokens, vectors):\n    print(token, \"->\", vector)",
        "exercises": [
          {
            "title": "Experiment A — inspect the mapping",
            "level": "Beginner",
            "objective": "Distinguish vocabulary IDs from embedding vectors.",
            "tasks": [
              "Run the code and inspect the token IDs.",
              "Change the order of words and compare the ID sequence.",
              "Add a new vocabulary word and a matching embedding vector.",
              "Explain why changing an ID changes which row is selected from the embedding table."
            ],
            "expectedOutcome": "Token IDs identify vocabulary entries; the embedding table maps each ID to a vector."
          },
          {
            "title": "Experiment B — implement a safer toy tokenizer",
            "level": "Intermediate",
            "objective": "See why real tokenization is more complex than whitespace splitting.",
            "tasks": [
              "Convert the input to lowercase before splitting and observe what breaks for case-sensitive vocabulary entries.",
              "Add punctuation handling for commas and full stops.",
              "Handle unknown words with an UNK token instead of raising KeyError.",
              "Write down at least four ways this toy tokenizer differs from a production subword tokenizer."
            ],
            "expectedOutcome": "You should handle unknown input explicitly and recognize that this remains a teaching simulation, not a real model tokenizer."
          }
        ]
      },
      {
        "heading": "3. Context windows: a finite working budget",
        "body": [
          "The context window is the maximum amount of tokenized input and output a model can process for a request, according to that model's limits. It is not the same as the model's long-term memory. A new request only has access to the context that the application sends or that the model service otherwise makes available.",
          "A request's context may include system instructions, developer instructions, chat history, the current user message, retrieved passages, tool outputs, formatting constraints and reserved output capacity. Some providers count additional message-format or multimodal tokens. Always use the selected model's documented accounting.",
          "Architecturally, reserve output tokens before assembling the prompt. If the model supports an 8,000-token context and you reserve 1,200 for output, the input budget is at most 6,800 before considering provider-specific overhead. Filling every token with old chat history is usually poor design.",
          "More context is not automatically better. Irrelevant or contradictory content can distract the model, increase cost and latency, and make debugging difficult. Retrieval should prioritize relevant evidence; conversation memory should be summarized or selected; tool outputs should be bounded.",
          "Context overflow should be handled deliberately. Options include trimming low-priority history, summarizing older turns, reducing retrieved chunks, shortening tool output or asking the user to narrow the request. Do not silently cut off critical instructions or evidence."
        ],
        "codeTitle": "lab_03_context_budget.py",
        "code": "context_limit = 8000\noutput_reserve = 1200\nprovider_overhead = 150\n\nprompt_parts = {\n    \"system_instructions\": 500,\n    \"conversation_history\": 1800,\n    \"retrieved_documents\": 3200,\n    \"tool_output\": 450,\n    \"current_question\": 300,\n}\n\ninput_budget = context_limit - output_reserve - provider_overhead\nused_tokens = sum(prompt_parts.values())\nremaining = input_budget - used_tokens\n\nprint(\"Input budget:\", input_budget)\nprint(\"Used tokens:\", used_tokens)\nprint(\"Remaining:\", remaining)\nprint(\"Fits:\", remaining >= 0)\n\n# Rank context by priority and remove the lowest-priority item if needed.\npriority = [\"system_instructions\", \"current_question\", \"retrieved_documents\", \"tool_output\", \"conversation_history\"]\nwhile used_tokens > input_budget:\n    removable = priority.pop()  # remove lowest priority first\n    removed = prompt_parts.pop(removable, 0)\n    used_tokens -= removed\n    print(\"Removed\", removable, \"tokens:\", removed)\n\nprint(\"Final prompt parts:\", prompt_parts)\nprint(\"Final token estimate:\", used_tokens)",
        "exercises": [
          {
            "title": "Experiment A — overflow deliberately",
            "level": "Beginner",
            "objective": "Understand the arithmetic of context budgeting.",
            "tasks": [
              "Set conversation_history to 4,000 tokens.",
              "Run the script and observe which item is removed first.",
              "Change output_reserve from 1,200 to 2,000 and compare.",
              "Explain why output capacity must be reserved before the request is sent."
            ],
            "expectedOutcome": "The prompt should fit only after lower-priority context is removed; larger output reserve reduces available input budget."
          },
          {
            "title": "Experiment B — improve the policy",
            "level": "Intermediate",
            "objective": "Design a more realistic context selection policy.",
            "tasks": [
              "Replace the simple priority list with explicit priorities and a loop that removes the lowest-priority item.",
              "Never allow system instructions or the current question to be removed.",
              "Add a warning when retrieved evidence must be truncated.",
              "Print a clear audit summary of what was retained and removed."
            ],
            "expectedOutcome": "A deterministic budget manager protects critical content and makes truncation decisions observable."
          },
          {
            "title": "Experiment C — RAG prompt budget",
            "level": "Architect",
            "objective": "Connect context budgeting to a future retrieval system.",
            "tasks": [
              "Assume each retrieved chunk costs 350 tokens and you can include at most 8 chunks.",
              "Reserve tokens for instructions, chat history, question and output.",
              "Calculate the maximum number of chunks that fit.",
              "Explain why top-8 retrieval is not always optimal if several chunks are duplicates or irrelevant."
            ],
            "expectedOutcome": "Retrieval count should be constrained by relevance and token budget, not by a fixed arbitrary k alone."
          }
        ]
      },
      {
        "heading": "4. Cost, latency, truncation and security implications",
        "body": [
          "Many model services price input and output tokens differently. Output generation can also take longer because autoregressive decoding produces tokens sequentially. A prompt that repeatedly includes a large conversation history can become expensive even when the user's latest question is short.",
          "Context length also affects serving memory and throughput. Long prompts require processing more tokens; the exact performance impact depends on architecture, hardware, batching and attention implementation. Do not assume doubling context always doubles end-to-end latency, but treat context size as an important capacity variable.",
          "Prompt injection can be embedded in retrieved documents, web pages or tool output. These are data, not trusted instructions. Keep system policy separate, delimit untrusted content, and enforce authorization in application code. A model should not be allowed to elevate a retrieved document's instructions above application policy.",
          "Token estimates are useful for planning but should be reconciled with provider-reported usage. Track input tokens, output tokens, cache-read/cache-write tokens where applicable, model identity and feature/tenant dimensions."
        ],
        "exercises": [
          {
            "title": "Architect exercise — context policy",
            "level": "Architect",
            "objective": "Create a policy for an enterprise assistant with a limited context window.",
            "tasks": [
              "Define a token budget for system instructions, history, retrieved chunks, tool output and answer reserve.",
              "Specify what gets summarized, truncated or rejected when the budget is exceeded.",
              "Describe how the system prevents untrusted retrieved content from overriding instructions.",
              "List token and latency metrics needed to detect prompt bloat."
            ],
            "expectedOutcome": "A clear prioritization policy, safe handling of untrusted content and usage telemetry."
          }
        ]
      },
      {
        "heading": "5. Self-assessment and interview drill",
        "body": [
          "Before moving on, explain the entire chain without notes: text → tokens → IDs → embeddings → positional information → Transformer processing. Then explain why the context window is a request budget rather than persistent memory.",
          "Interviewers often test whether candidates confuse tokenization with embeddings, context windows with memory, or fine-tuning with retrieval. Be precise: tokenization creates IDs; embeddings map IDs to vectors; context is the supplied sequence; retrieval fetches external information."
        ],
        "qa": [
          {
            "q": "Q1. Is one token equal to one word?",
            "a": "No. A token can be a word, subword, punctuation or another tokenizer-specific unit. Exact tokenization depends on the model tokenizer."
          },
          {
            "q": "Q2. What is the difference between a token ID and an embedding?",
            "a": "A token ID is an integer identifier in the vocabulary. An embedding is a learned vector associated with that ID."
          },
          {
            "q": "Q3. Does a larger context window mean the model remembers previous conversations?",
            "a": "No. The context window is the amount of content supplied to a request. Persistent conversation memory requires application-side storage or a provider feature."
          },
          {
            "q": "Q4. Why reserve output tokens?",
            "a": "To ensure the model has room to generate a response within its context limit. Otherwise the request may overflow or the output may be cut short."
          },
          {
            "q": "Q5. Why not always retrieve the maximum number of chunks?",
            "a": "More chunks can introduce noise, duplicates, irrelevant content, cost and context pressure. Retrieval quality matters more than raw quantity."
          }
        ]
      }
    ],
    "hinglishGuide": "Yahan sabse important distinction hai: text → token IDs → vectors. Context window ko model ki permanent memory mat samajhna; ye har request ka limited working budget hai. Labs mein hum khud token mapping aur context budgeting simulate karenge."
  },
  {
    "slug": "transformer-architecture",
    "title": "Transformer Architecture — The Complete Mental Model",
    "description": "Understand the original Transformer idea, decoder-only LLMs, embeddings, attention, MLPs, residuals, normalization, positional encoding and inference caching.",
    "objective": "Draw and explain a decoder-only Transformer block, identify the purpose of every major component, and reason about the performance implications of model depth and context length.",
    "readTime": "60–75 min study",
    "sections": [
      {
        "heading": "1. Why Transformers changed sequence modelling",
        "body": [
          "Before Transformers became dominant, recurrent neural networks processed sequences one step at a time. The hidden state at one position was passed to the next. This creates a sequential dependency that makes parallel training difficult, and information from far-away tokens must travel through many recurrent steps.",
          "The Transformer introduced attention as a way for positions to exchange information directly. During training, many positions can be processed in parallel subject to the causal mask. A token can compute attention over permitted earlier positions instead of relying only on a single recurrent state.",
          "The original 2017 Transformer architecture used an encoder and decoder. The encoder builds representations of the input sequence; the decoder generates output while attending to encoder representations and previously generated tokens. Many modern generative LLMs instead use decoder-only stacks with causal self-attention.",
          "Do not conclude that every Transformer is a chatbot or every LLM has the same block layout. Encoder-only models are useful for representation tasks; encoder-decoder models are useful for input-to-output transformations; decoder-only models are widely used for autoregressive generation."
        ],
        "exercises": [
          {
            "title": "Architecture comparison",
            "level": "Beginner",
            "objective": "Understand the high-level family differences.",
            "tasks": [
              "Describe encoder-only, encoder-decoder and decoder-only in your own words.",
              "Give one plausible task for each architecture family.",
              "Explain why a decoder-only model uses causal masking."
            ],
            "expectedOutcome": "You can distinguish the architectures by information flow and task shape, not just by model names."
          }
        ]
      },
      {
        "heading": "2. End-to-end decoder-only architecture",
        "body": [
          "At a high level, the input token IDs are mapped to embedding vectors. Positional information is incorporated, then the sequence passes through a stack of Transformer blocks. A final normalization and language-model head map the final hidden representation to vocabulary logits.",
          "Shape intuition: if a batch contains B sequences, each with sequence length T, and the hidden dimension is D, the hidden-state tensor is conceptually shaped [B, T, D]. Attention and MLP operations transform this tensor while preserving the sequence and hidden dimensions at the block boundary.",
          "The language-model head maps each position's hidden vector to a score for every vocabulary token. During training, positions are compared against next-token targets. During inference, the model uses the final position's logits to choose the next token.",
          "Model configuration often includes number of layers, hidden dimension, number of attention heads, key/value head count, vocabulary size and maximum context length. These are architecture parameters with consequences for compute, memory, throughput and quality."
        ],
        "codeTitle": "lab_04_tensor_shape_walkthrough.py",
        "code": "batch_size = 2\nsequence_length = 128\nhidden_dimension = 768\nvocabulary_size = 50000\nnumber_of_layers = 12\n\nhidden_shape = (batch_size, sequence_length, hidden_dimension)\nlogits_shape = (batch_size, sequence_length, vocabulary_size)\n\nprint(\"Input hidden states:\", hidden_shape)\nprint(\"After each Transformer block: same outer shape\")\nprint(\"Language-model logits:\", logits_shape)\nprint(\"Number of block repetitions:\", number_of_layers)\n\n# Parameter count is not calculated here; this is a shape-only simulation.",
        "exercises": [
          {
            "title": "Shape reasoning",
            "level": "Intermediate",
            "objective": "Read architecture dimensions like an engineer.",
            "tasks": [
              "Change sequence_length from 128 to 512 and explain which tensor dimension changes.",
              "Change hidden_dimension from 768 to 1024 and explain why the representation width changes.",
              "Explain why logits include vocabulary_size as the final dimension.",
              "Explain why the model does not need to generate all vocabulary tokens, only score them."
            ],
            "expectedOutcome": "You should be able to trace the dimensions through the model at a conceptual level."
          }
        ]
      },
      {
        "heading": "3. Inside a Transformer block",
        "body": [
          "A simplified decoder block contains masked self-attention, a feed-forward network (MLP), residual connections and normalization. Implementations vary: some use pre-normalization, some use different normalization variants, and some use grouped-query attention or other efficiency improvements.",
          "Self-attention lets each token build a weighted combination of information from other permitted positions. It performs learned projections to Query, Key and Value, calculates compatibility scores, applies a mask and softmax, and aggregates Value vectors.",
          "The MLP then applies learned nonlinear transformations to each position independently. Attention mixes information across positions; the MLP transforms features within each position. Both are important. A Transformer is not “only attention”.",
          "Residual connections add a block's input to its transformed output. This creates a path for information and gradients to flow through deep networks. Normalization controls activation scale and helps make optimization more stable. Exact placement and normalization type are architecture-specific.",
          "Stacking many blocks allows repeated contextual processing. Early and later layers may learn different representations, but do not assume a simple fixed human-readable role for every layer or attention head."
        ],
        "exercises": [
          {
            "title": "Explain the block to a colleague",
            "level": "Beginner",
            "objective": "Verify the functional distinction between attention and MLP.",
            "tasks": [
              "Draw one Transformer block with attention, residual/norm, MLP and residual/norm.",
              "Write one sentence explaining what attention mixes.",
              "Write one sentence explaining what the MLP transforms.",
              "Explain what a residual connection contributes."
            ],
            "expectedOutcome": "A clear diagram and correct distinction between sequence-wise information mixing and per-position feature transformation."
          }
        ]
      },
      {
        "heading": "4. Positional information and causal masking",
        "body": [
          "Self-attention by itself does not inherently encode the order in which tokens appeared. If the model had no positional signal, the sequence structure would be ambiguous. Positional methods inject information about token positions or relative positions.",
          "Learned absolute positional embeddings are one approach. Rotary Position Embeddings (RoPE) rotate query/key representations based on position and are widely used in modern decoder architectures. There are other approaches and variations; the key concept is that the model needs access to order information.",
          "Causal masking restricts a position from attending to future positions. For a sequence of four tokens, token 1 can attend only to token 1; token 2 can attend to tokens 1–2; token 3 can attend to 1–3; token 4 can attend to 1–4. This lower-triangular visibility pattern matches autoregressive next-token training.",
          "During training, the model can compute many positions in parallel while the mask prevents information leakage from future positions. During generation, only the next position is being extended, and the model uses prior context."
        ],
        "codeTitle": "lab_05_causal_mask.py",
        "code": "sequence_length = 5\n\nfor query_position in range(sequence_length):\n    visible = [\n        key_position\n        for key_position in range(sequence_length)\n        if key_position <= query_position\n    ]\n    print(f\"Token {query_position} can attend to: {visible}\")\n\n# A production attention implementation uses a numeric mask\n# applied to attention scores before softmax.",
        "exercises": [
          {
            "title": "Mask matrix exercise",
            "level": "Intermediate",
            "objective": "Make causal visibility concrete.",
            "tasks": [
              "Run the code and inspect visibility for each token.",
              "Draw a 5×5 matrix with 1 for visible positions and 0 for blocked future positions.",
              "Explain what information leakage would occur if future positions were visible during next-token training.",
              "Explain why causal masking is not the same as hiding the user's entire prompt."
            ],
            "expectedOutcome": "A lower-triangular mask: each position can see itself and earlier positions, but not later ones."
          }
        ]
      },
      {
        "heading": "5. KV cache and inference efficiency",
        "body": [
          "Autoregressive generation repeatedly extends a sequence. Without caching, a naive implementation could recompute key and value projections for all previous tokens every time a new token is generated. This repeats work.",
          "A KV cache stores previously computed Key and Value tensors for earlier positions. When a new token arrives, the model computes the new token's query/key/value and reuses cached keys and values from earlier positions. This reduces redundant computation during decoding.",
          "The cache is not free. It consumes accelerator memory and grows with sequence length, batch size, number of layers and KV-head dimensions. Serving systems must balance batch size, context length, concurrency and cache capacity.",
          "Multi-query attention and grouped-query attention reduce the number of key/value heads compared with standard multi-head attention, which can reduce KV-cache memory. These are architecture and serving choices with quality/performance trade-offs."
        ],
        "exercises": [
          {
            "title": "KV cache reasoning",
            "level": "Architect",
            "objective": "Connect model internals to serving capacity.",
            "tasks": [
              "Explain what is stored in a KV cache and why.",
              "Describe why cache memory grows as the conversation becomes longer.",
              "Explain why a large batch of long-context requests can pressure GPU memory.",
              "Compare the likely cache-memory implications of multi-head and grouped-query attention."
            ],
            "expectedOutcome": "You can explain the performance benefit and memory cost of KV caching without claiming it removes all attention computation."
          }
        ]
      },
      {
        "heading": "6. Architect-level trade-offs and interview drill",
        "body": [
          "Sequence length is a major performance variable. Standard full self-attention has pairwise interactions across sequence positions, so attention compute and memory can grow quadratically with sequence length in common formulations. Optimized kernels and alternative attention methods can improve practical behavior, but long context still has serving implications.",
          "Model width and depth also matter. Larger hidden dimensions and more layers generally increase parameter count and compute. More attention heads change how representations are partitioned. The best architecture is not simply the largest one; it must satisfy quality, latency, throughput, memory and cost constraints.",
          "When evaluating a model for an enterprise product, consider the full workload: prompt length distribution, output length, concurrent users, streaming requirements, retrieval payload size, hardware or provider limits and quality targets. Benchmark representative traffic rather than relying only on parameter count.",
          "Interview questions should test causal reasoning: why positional information exists, what Q/K/V do, why the MLP is necessary, why KV caching helps, and how context length affects serving cost."
        ],
        "qa": [
          {
            "q": "Q1. Why did Transformers replace many recurrent approaches?",
            "a": "They enable attention-based information exchange and much more parallelizable training over sequence positions, avoiding the strict step-by-step dependency of recurrent processing."
          },
          {
            "q": "Q2. What are the main parts of a decoder-only Transformer?",
            "a": "Token embeddings, positional information, repeated causal Transformer blocks, final normalization and a language-model head that produces vocabulary logits."
          },
          {
            "q": "Q3. What is the difference between attention and the MLP?",
            "a": "Attention mixes information across permitted sequence positions. The MLP applies learned nonlinear feature transformations independently at each position."
          },
          {
            "q": "Q4. Why are residual connections used?",
            "a": "They provide skip paths for information and gradients, helping optimization in deep networks."
          },
          {
            "q": "Q5. Why is KV caching useful and what does it cost?",
            "a": "It reuses prior key/value states during autoregressive generation, reducing repeated computation but consuming memory that grows with active sequence and batch dimensions."
          },
          {
            "q": "Q6. Why does long context affect serving capacity?",
            "a": "More tokens require more processing and often more attention/cache memory. This can reduce throughput or increase latency and cost."
          }
        ]
      }
    ],
    "hinglishGuide": "Transformer ko ek black box ki tarah yaad nahi karna. Hum layer-by-layer dekhenge ki embeddings, positional information, attention, MLP, residual connections aur KV cache ka role kya hai, aur ye serving cost ko kaise affect karte hain."
  },
  {
    "slug": "self-attention-qkv",
    "title": "Self-Attention Deep Dive — Query, Key, Value and the Math",
    "description": "Move beyond the Q/K/V analogy: derive scaled dot-product attention, calculate weights by hand, implement it with Python lists and understand masks and multiple heads.",
    "objective": "Calculate a small attention example manually and in Python; explain projections, scaling, softmax, masking and multi-head attention precisely.",
    "readTime": "60–75 min study",
    "sections": [
      {
        "heading": "1. Why attention is needed",
        "body": [
          "A token representation needs contextual information. In “The animal didn't cross the street because it was too tired”, understanding “it” benefits from connecting it to “animal”. Attention provides a learned mechanism for combining information from other positions.",
          "Self-attention means queries, keys and values are derived from the same input sequence. Cross-attention is different: queries come from one sequence while keys and values come from another, as in the original encoder-decoder Transformer.",
          "The phrase “attention looks at important words” is a useful first intuition but incomplete. The operation is a differentiable weighted aggregation of vector representations. Attention weights are not a complete explanation of what the model understands."
        ],
        "exercises": [
          {
            "title": "Self-attention vs cross-attention",
            "level": "Beginner",
            "objective": "Understand where Q/K/V originate.",
            "tasks": [
              "Describe why self-attention uses the same sequence as source for Q, K and V.",
              "Describe a translation example where decoder queries attend to encoder outputs.",
              "Explain why attention weights should not be treated as a full explanation of model reasoning."
            ],
            "expectedOutcome": "Self-attention mixes information within one sequence; cross-attention connects a query sequence to a separate key/value sequence."
          }
        ]
      },
      {
        "heading": "2. Query, Key and Value are learned projections",
        "body": [
          "Let the input hidden-state matrix be X. The model multiplies X by learned projection matrices W_Q, W_K and W_V to produce Q, K and V. In simplified notation: Q = XW_Q, K = XW_K and V = XW_V. Biases may be present depending on the implementation.",
          "Query and Key determine compatibility scores. For a query vector q and key vector k, a dot product q·k measures alignment in the learned representation space. Value vectors carry the information that is aggregated using the resulting weights.",
          "The analogy “Query asks, Key advertises, Value contains information” helps remember the roles, but these are not literal natural-language questions. They are learned numerical projections optimized as part of the model.",
          "Why separate them? The model can learn one representation for matching and another representation for the content to aggregate. The projections let attention learn useful relationships rather than simply averaging raw token embeddings."
        ],
        "exercises": [
          {
            "title": "Projection intuition",
            "level": "Intermediate",
            "objective": "Reason about learned matrices.",
            "tasks": [
              "Write the equations Q = XW_Q, K = XW_K and V = XW_V.",
              "Explain why Q and K need compatible dimensions for their dot product.",
              "Explain why V's output dimension is related to the representation being aggregated.",
              "Describe what would happen if all three projections were fixed identity matrices instead of learned."
            ],
            "expectedOutcome": "You should understand that Q/K/V are learned views of the same input, not three independently supplied pieces of text."
          }
        ]
      },
      {
        "heading": "3. Derive scaled dot-product attention step by step",
        "body": [
          "The standard equation is Attention(Q,K,V) = softmax(QKᵀ / √dₖ)V. For one query, first calculate its dot product with every key. These scores estimate compatibility in the learned space.",
          "Next divide each score by √dₖ, where dₖ is the key-vector dimension. As dimension grows, dot-product magnitude can grow. Scaling keeps values in a more manageable range before softmax and helps avoid extremely saturated distributions during optimization.",
          "Softmax converts scores into non-negative weights that sum to one. The final output is a weighted sum of Value vectors. A key with a larger attention weight contributes more strongly to that query's output.",
          "For multiple query positions, QKᵀ produces a score matrix. Each row corresponds to a query position and each column to a key position. Masking may modify scores before softmax. The output matrix has one aggregated representation per query position."
        ],
        "codeTitle": "lab_06_scaled_dot_product.py",
        "code": "import math\n\n\ndef dot(a, b):\n    if len(a) != len(b):\n        raise ValueError(\"vectors must have the same dimension\")\n    return sum(x * y for x, y in zip(a, b))\n\n\ndef softmax(scores):\n    peak = max(scores)\n    exps = [math.exp(score - peak) for score in scores]\n    total = sum(exps)\n    return [value / total for value in exps]\n\n\nquery = [1.0, 0.5]\nkeys = [\n    [1.0, 0.0],\n    [0.0, 1.0],\n    [0.5, 0.5],\n]\nvalues = [\n    [10.0, 0.0],\n    [0.0, 20.0],\n    [5.0, 5.0],\n]\n\nd_k = len(query)\nscores = [dot(query, key) / math.sqrt(d_k) for key in keys]\nweights = softmax(scores)\n\noutput = [\n    sum(weight * value[dimension] for weight, value in zip(weights, values))\n    for dimension in range(len(values[0]))\n]\n\nprint(\"Scaled scores:\", [round(score, 4) for score in scores])\nprint(\"Attention weights:\", [round(weight, 4) for weight in weights])\nprint(\"Output vector:\", [round(value, 4) for value in output])\nprint(\"Weight sum:\", round(sum(weights), 6))",
        "exercises": [
          {
            "title": "Experiment A — calculate by hand",
            "level": "Beginner",
            "objective": "Verify the mathematics independently of code.",
            "tasks": [
              "Use query [1, 0] and keys [1, 0] and [0, 1].",
              "Calculate both dot products manually.",
              "For d_k = 2, divide both scores by square root of 2.",
              "Explain qualitatively which key receives the larger softmax weight."
            ],
            "expectedOutcome": "The first key has the higher score and therefore receives the higher attention weight."
          },
          {
            "title": "Experiment B — change keys vs values",
            "level": "Intermediate",
            "objective": "Understand which inputs control weights and which control the output content.",
            "tasks": [
              "Run the code and record the weights and output.",
              "Change only the values and rerun; compare weights.",
              "Restore values, change one key and rerun; compare weights.",
              "Explain why changing values alone does not change attention weights."
            ],
            "expectedOutcome": "Weights depend on Q and K (plus mask/scale); the output vector depends on those weights and V."
          },
          {
            "title": "Experiment C — implement matrix-free attention for multiple queries",
            "level": "Advanced",
            "objective": "Extend the one-query implementation.",
            "tasks": [
              "Create two query vectors.",
              "Calculate scores for each query against every key.",
              "Apply softmax independently to each query's score row.",
              "Calculate one output vector per query.",
              "Print the attention matrix and verify every row sums to 1."
            ],
            "expectedOutcome": "A two-row attention matrix and two output vectors, one per query position."
          }
        ]
      },
      {
        "heading": "4. Causal masks and attention masks",
        "body": [
          "In a decoder-only language model, a position cannot attend to future positions. The mask is applied to attention scores before softmax, typically by adding a very negative value to disallowed positions. After softmax, those positions receive effectively zero probability.",
          "Padding masks solve a different problem. If sequences in a batch are padded to the same length, the model may need to prevent attention to padding positions. Causal masks enforce autoregressive direction; padding masks exclude artificial padding. Some implementations combine multiple masks.",
          "Masking is security- and correctness-relevant at the mathematical level: if a future target leaks into a position during training, the model is no longer learning the intended autoregressive prediction task."
        ],
        "codeTitle": "lab_07_masked_softmax.py",
        "code": "import math\n\nscores = [1.2, 0.8, 2.4, 1.9]\nquery_position = 1\n\nmasked_scores = [\n    score if key_position <= query_position else float(\"-inf\")\n    for key_position, score in enumerate(scores)\n]\n\n# Stable softmax with negative infinity handled naturally.\npeak = max(masked_scores)\nexps = [0.0 if score == float(\"-inf\") else math.exp(score - peak) for score in masked_scores]\ntotal = sum(exps)\nweights = [value / total for value in exps]\n\nprint(\"Original scores:\", scores)\nprint(\"Masked scores:\", masked_scores)\nprint(\"Weights:\", weights)",
        "exercises": [
          {
            "title": "Masking lab",
            "level": "Intermediate",
            "objective": "Implement correct causal visibility.",
            "tasks": [
              "Change query_position from 1 to 3 and observe which keys become visible.",
              "Modify the mask condition to key_position < query_position and explain why that incorrectly blocks self-attention.",
              "Add a padding mask that blocks the last key even when it is in the past.",
              "Explain the difference between causal and padding masks."
            ],
            "expectedOutcome": "A correct causal mask allows the current token and all previous tokens; padding masks can independently remove invalid positions."
          }
        ]
      },
      {
        "heading": "5. Multi-head attention and architecture variants",
        "body": [
          "Multi-head attention performs several attention operations in parallel, each with its own learned projections. Each head can learn a different representation subspace and contextual relationship. The outputs are concatenated and passed through an output projection.",
          "More heads do not mean the model has a fixed interpretable set of roles such as “grammar head” or “reasoning head”. Heads are learned components and their behavior can be distributed, overlapping or difficult to interpret.",
          "Standard multi-head attention uses separate key/value heads corresponding to query heads. Multi-query attention shares key/value heads broadly; grouped-query attention groups multiple query heads around fewer key/value heads. These variants can reduce KV-cache memory and improve serving efficiency.",
          "Architects should understand the serving consequence: KV-cache memory depends heavily on the number of layers, sequence length, active batch/concurrency and key/value dimensions. Reducing KV heads can improve memory efficiency, but model design and quality must be evaluated empirically."
        ],
        "exercises": [
          {
            "title": "Architecture trade-off discussion",
            "level": "Architect",
            "objective": "Connect attention design to production constraints.",
            "tasks": [
              "Explain why multi-head attention can learn multiple representation subspaces.",
              "Explain why grouped-query attention can reduce KV cache size.",
              "A workload has long prompts and high concurrency. List the attention-related metrics you would benchmark.",
              "Explain why you would not choose an attention variant based only on its name."
            ],
            "expectedOutcome": "You can relate architecture choices to memory, latency, throughput and measured model quality."
          }
        ]
      },
      {
        "heading": "6. Interview drill and mastery checklist",
        "body": [
          "Be ready to derive the attention equation rather than merely recite it. Explain what each matrix represents, what softmax normalizes, why scaling is used, where masking occurs and how Value vectors form the output.",
          "At architect level, connect the mechanism to inference. Long context increases attention work and KV-cache footprint. Grouped-query attention can reduce cache size. Optimized kernels improve hardware utilization. All such choices must be benchmarked with representative prompt lengths and concurrency."
        ],
        "qa": [
          {
            "q": "Q1. What are Q, K and V?",
            "a": "They are learned projections of input hidden states. Q and K produce compatibility scores; V contains the vectors aggregated using attention weights."
          },
          {
            "q": "Q2. Why divide by square root of d_k?",
            "a": "To control dot-product scale as the key dimension grows, reducing extreme softmax saturation and supporting stable optimization."
          },
          {
            "q": "Q3. What does softmax normalize?",
            "a": "It converts each query's allowed attention scores into non-negative weights that sum to one across the key positions."
          },
          {
            "q": "Q4. Does changing V change attention weights?",
            "a": "No. Weights are determined by Q, K, scaling and masking. V changes the weighted output content."
          },
          {
            "q": "Q5. What is the difference between causal and padding masks?",
            "a": "Causal masks block future positions. Padding masks block artificial padded positions in batched sequences."
          },
          {
            "q": "Q6. Why use grouped-query attention?",
            "a": "It uses fewer key/value heads than query heads, reducing KV-cache memory and often improving inference efficiency."
          }
        ]
      }
    ],
    "hinglishGuide": "Q, K aur V ko sirf analogy se nahi samjhenge; formula derive karenge, scores manually calculate karenge aur Python mein attention implement karenge. Focus rahega ki weights kahan se aate hain aur output vector kaise banta hai."
  },
  {
    "slug": "training-vs-inference",
    "title": "Training vs Inference — From Learning Parameters to Serving Real Users",
    "description": "Understand pretraining, loss, gradient descent, fine-tuning, alignment, autoregressive inference and the architecture of a production model-serving system.",
    "objective": "Explain the model lifecycle, distinguish training from inference, compare fine-tuning with RAG, and design an inference-serving path with operational controls.",
    "readTime": "60 min study",
    "sections": [
      {
        "heading": "1. Training and inference solve different problems",
        "body": [
          "Training changes model parameters so that the model performs better on a learning objective. Inference uses the trained parameters to produce outputs for new inputs. This is the central distinction: training learns; inference serves.",
          "Training workloads typically process datasets in batches and perform forward computation, loss calculation, backpropagation and optimizer updates. Inference workloads receive live requests and focus on response quality, latency, throughput, availability and cost.",
          "Training and inference may use similar model architectures but different execution patterns. Training needs gradients and often stores activations for backward computation. Inference normally does not calculate gradients, so memory and compute requirements differ.",
          "Most enterprise application teams consume models through inference APIs or hosted model services. They should understand training concepts enough to make sound choices about model selection, fine-tuning, evaluation and deployment, even if they do not train foundation models themselves."
        ],
        "exercises": [
          {
            "title": "Training or inference?",
            "level": "Beginner",
            "objective": "Classify operations correctly.",
            "tasks": [
              "Classify tokenization, forward pass, loss calculation, backward pass, optimizer update, decoding and response streaming.",
              "Explain which steps modify model parameters.",
              "Explain why inference generally does not need gradient calculation."
            ],
            "expectedOutcome": "Loss/backpropagation/optimizer updates belong to training; decoding and live response generation belong to inference."
          }
        ]
      },
      {
        "heading": "2. How pretraining learns parameters",
        "body": [
          "In next-token pretraining, the model receives token sequences and learns to predict the next token at many positions. The training pipeline creates inputs and targets, runs a forward pass, calculates a loss such as cross-entropy and computes gradients with respect to model parameters.",
          "An optimizer such as AdamW uses gradients to update parameters. Conceptually, an update moves parameters in a direction that should reduce the objective. Real training uses many batches, learning-rate schedules, distributed compute, gradient management and checkpointing.",
          "Training data quality matters. Duplicate, low-quality, biased or contaminated data can affect model behavior. Data governance, filtering, deduplication, privacy controls and evaluation are important parts of the pipeline, not optional housekeeping.",
          "Training a foundation model from scratch is expensive. It requires large datasets, accelerator clusters, distributed training expertise, fault tolerance and extensive evaluation. Most product teams should start with an existing model and choose prompting, retrieval or fine-tuning based on the problem."
        ],
        "codeTitle": "lab_08_training_loop_simulation.py",
        "code": "# A conceptual training loop. This does NOT train a neural network.\n\nparameters = 10.0\nlearning_rate = 0.1\n\n# Pretend the loss is (parameter - target)^2.\ntarget = 2.0\n\nfor step in range(5):\n    loss = (parameters - target) ** 2\n    gradient = 2 * (parameters - target)\n    parameters = parameters - learning_rate * gradient\n    print(\n        f\"step={step + 1} loss={loss:.4f} \"\n        f\"updated_parameter={parameters:.4f}\"\n    )\n\nprint(\"Final parameter:\", parameters)",
        "exercises": [
          {
            "title": "Experiment A — learning rate",
            "level": "Beginner",
            "objective": "See how optimizer step size affects convergence.",
            "tasks": [
              "Run the simulation with learning_rate = 0.1.",
              "Try 0.01 and compare how quickly the parameter moves.",
              "Try 1.1 and observe whether the update behaves sensibly.",
              "Explain why this toy example is not a realistic neural-network training loop."
            ],
            "expectedOutcome": "You should see that learning rate controls update size and that overly large steps can overshoot or diverge."
          },
          {
            "title": "Experiment B — add stopping criteria",
            "level": "Intermediate",
            "objective": "Make the simulation more robust.",
            "tasks": [
              "Stop when loss is below 0.001.",
              "Add a maximum step count.",
              "Print whether training converged or hit the limit.",
              "Explain why production training monitors validation metrics in addition to training loss."
            ],
            "expectedOutcome": "A bounded loop with explicit convergence reporting and awareness of overfitting."
          }
        ]
      },
      {
        "heading": "3. Pretraining, supervised fine-tuning and preference alignment",
        "body": [
          "Pretraining teaches broad patterns from large-scale data. Supervised fine-tuning (SFT) continues training on curated input-output examples so the model better follows instructions or performs a target task.",
          "Preference optimization or reinforcement-learning-based alignment methods can further shape model responses according to preference signals or other objectives. The exact algorithms and pipelines differ across providers and model families; avoid assuming every model uses one identical recipe.",
          "Parameter-efficient fine-tuning methods such as LoRA introduce trainable low-rank updates while keeping most base parameters frozen. This can reduce trainable parameter count and make adaptation more practical, though it still requires data, evaluation and deployment discipline.",
          "Fine-tuning is not a substitute for current knowledge retrieval. If a company policy changes weekly, fine-tuning a model on the old policy does not automatically keep it current. RAG can retrieve the latest authorized documents at request time. Fine-tuning is more suited to adapting response behavior, format or task patterns."
        ],
        "exercises": [
          {
            "title": "Choose the adaptation method",
            "level": "Intermediate",
            "objective": "Avoid using fine-tuning as a universal solution.",
            "tasks": [
              "Scenario A: answer questions from policies updated every week. Choose an approach and justify it.",
              "Scenario B: consistently produce a strict domain-specific output format. Choose an approach and justify it.",
              "Scenario C: answer from private documents while respecting user permissions. Design the retrieval boundary.",
              "Explain when combining fine-tuning and RAG might be reasonable."
            ],
            "expectedOutcome": "Changing facts and private source material usually favor retrieval; behavior/style/task adaptation may favor fine-tuning; combined designs are possible."
          }
        ]
      },
      {
        "heading": "4. Autoregressive inference and decoding",
        "body": [
          "At inference time, the prompt is tokenized and processed by the model. The model produces logits for the next token. A decoding method selects a token, which is appended to the sequence. The process repeats until a stop condition or output budget is reached.",
          "Greedy decoding always selects the highest-scoring token. It is deterministic for a fixed model and input when other settings are fixed, but it can produce repetitive or overly predictable output. Sampling draws from a probability distribution and can increase diversity.",
          "Temperature rescales logits before sampling. Top-k sampling restricts candidates to the k highest-scoring tokens. Top-p (nucleus) sampling selects a smallest candidate set whose cumulative probability reaches a threshold. These controls change output behavior, not the underlying learned knowledge.",
          "Streaming returns generated pieces as they become available. It improves perceived responsiveness but introduces client-side concerns: partial output may be incomplete, the user may cancel, and structured output may not be valid until generation finishes."
        ],
        "codeTitle": "lab_09_greedy_vs_sampling.py",
        "code": "import random\n\n\ndef greedy_choice(tokens, probabilities):\n    best_index = max(range(len(probabilities)), key=probabilities.__getitem__)\n    return tokens[best_index]\n\n\ndef sample_choice(tokens, probabilities):\n    return random.choices(tokens, weights=probabilities, k=1)[0]\n\n\ntokens = [\"A\", \"B\", \"C\"]\nprobabilities = [0.70, 0.20, 0.10]\n\nprint(\"Greedy:\", greedy_choice(tokens, probabilities))\n\ncounts = {token: 0 for token in tokens}\nfor _ in range(1000):\n    counts[sample_choice(tokens, probabilities)] += 1\n\nprint(\"Sampling counts over 1000 trials:\", counts)",
        "exercises": [
          {
            "title": "Decoding experiment",
            "level": "Intermediate",
            "objective": "Understand deterministic choice vs probabilistic sampling.",
            "tasks": [
              "Run the script several times and compare sampling counts.",
              "Change probabilities to [0.34, 0.33, 0.33].",
              "Explain why greedy decoding is stable but sampling varies.",
              "Describe a use case where predictable output is preferred and one where diversity is useful."
            ],
            "expectedOutcome": "Greedy always chooses the highest probability; sampling produces varied outcomes consistent with the distribution."
          }
        ]
      },
      {
        "heading": "5. Production inference architecture",
        "body": [
          "A production inference system has multiple boundaries. An API gateway authenticates the caller and applies quotas. An orchestration service validates the request, selects the model and assembles context. A model provider or inference server executes generation. Post-processing validates output and returns a response.",
          "Model routing can consider data classification, region, task complexity, quality target, latency and cost. A small model may handle classification or extraction; a stronger model may handle complex synthesis. Routing needs fallback rules and evaluation so that cost optimization does not silently degrade quality.",
          "Capacity controls include concurrency limits, request queues, batching and rate limiting. Timeouts prevent unbounded waiting. Retries should use bounded exponential backoff with jitter and should distinguish transient provider errors from invalid requests. A retry must not accidentally duplicate an external side effect.",
          "Security controls include tenant isolation, authorization before retrieval, secret management, prompt-injection defenses, output validation and audit trails. The model should not be trusted to enforce access permissions or execute arbitrary tool instructions.",
          "Observability should include request correlation IDs, model/provider version, token usage, latency by stage, retry count, status, safety outcomes and quality signals. For privacy, store only what is necessary and apply redaction, access control and retention limits."
        ],
        "exercises": [
          {
            "title": "Design the inference service",
            "level": "Architect",
            "objective": "Translate the model call into a resilient enterprise service.",
            "tasks": [
              "Draw the request flow from API gateway to response.",
              "Place authentication, authorization, model routing, prompt assembly and output validation.",
              "Define behavior for HTTP 429, provider timeout and malformed model output.",
              "Explain how you prevent duplicate tool execution after a timeout.",
              "Define a privacy-aware telemetry schema."
            ],
            "expectedOutcome": "A layered architecture with deterministic policy enforcement, bounded retries, clear failure responses and traceable telemetry."
          }
        ]
      },
      {
        "heading": "6. Hosted API vs self-hosted model: decision framework",
        "body": [
          "A hosted API can reduce infrastructure operations and provide access to high-quality models quickly. Trade-offs include provider dependency, pricing changes, rate limits, data-processing terms, regional availability and less control over serving internals.",
          "Self-hosting may offer control over deployment, network boundaries, model versions and optimization. But the organization now owns GPU procurement or capacity, inference software, scaling, security patching, monitoring, upgrades, incident response and utilization management.",
          "Compare total cost, not only per-token price. Include engineering time, idle capacity, peak demand, support, reliability, observability and opportunity cost. A low-cost open model can become expensive if it requires substantial operations or delivers lower quality that increases retries and human review.",
          "Use a representative workload benchmark: prompt length distribution, output length, concurrency, latency percentiles, task quality, failure rate and total cost per successful task. Do not choose a model based only on a public leaderboard."
        ],
        "exercises": [
          {
            "title": "Architecture decision record",
            "level": "Architect",
            "objective": "Make a defensible model hosting recommendation.",
            "tasks": [
              "Assume a 500-employee company has moderate usage and strict data residency requirements.",
              "Compare hosted API, private hosted deployment and self-hosted inference.",
              "List assumptions you need before recommending an option.",
              "Define a small proof-of-concept benchmark and success criteria.",
              "Write a short recommendation including risks and a fallback plan."
            ],
            "expectedOutcome": "A decision based on compliance, quality, operations, cost and measured workload rather than a blanket preference for hosted or self-hosted."
          }
        ]
      },
      {
        "heading": "7. Interview drill and mastery checklist",
        "body": [
          "Explain the difference between pretraining, supervised fine-tuning, alignment and inference. Then explain why RAG is usually the better mechanism for frequently changing enterprise knowledge.",
          "At architect level, describe how you would serve multiple model tiers, manage rate limits, observe token usage, protect tenant data and handle provider failures. Be prepared to discuss when a hosted API is preferable to self-hosting."
        ],
        "qa": [
          {
            "q": "Q1. What changes during training?",
            "a": "Model parameters are updated using a training objective, gradients and an optimizer. Inference normally uses fixed trained parameters."
          },
          {
            "q": "Q2. Does fine-tuning add live enterprise knowledge?",
            "a": "No. Fine-tuning changes model parameters based on a dataset. Live or frequently changing enterprise facts are usually better retrieved at request time."
          },
          {
            "q": "Q3. When is RAG preferable to fine-tuning?",
            "a": "When answers need private, changing or source-citable information. Fine-tuning is useful for adapting behavior, format or task patterns."
          },
          {
            "q": "Q4. Why can streaming improve UX?",
            "a": "It exposes partial generated output earlier, reducing perceived wait time. The client must handle cancellation and incomplete intermediate output."
          },
          {
            "q": "Q5. What should a production inference gateway measure?",
            "a": "Latency, throughput, token usage, model/provider, status and retry counts, safety outcomes and quality signals, with privacy-aware logging."
          },
          {
            "q": "Q6. What are the main trade-offs of self-hosting?",
            "a": "More control and deployment flexibility, but the organization owns GPU capacity, scaling, patching, monitoring, reliability and operations."
          }
        ]
      }
    ],
    "hinglishGuide": "Training mein model parameters update hote hain; inference mein trained parameters se response generate hota hai. Is difference ko code simulation aur enterprise serving architecture ke through samjhenge, phir RAG vs fine-tuning jaise design decisions practice karenge."
  }
];

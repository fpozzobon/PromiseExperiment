# Promise experiment in functional programming

*Disclamer :* this Promise doesn't handle reject and is only an experiment
I don't claime to be a functional programming expert so... I might still have some good old "Java-style" reflex.. :p

*Reason of this code :* after chatting with a colleague about Promises, in order to understand it deeper we decided to try to write it.
It sounded almost impossible to avoid having a state for the Promise to save the callbacks for the then...
I felt like there was a way to make it more "functional programming friendly"
And so... gave a shot and here we are using "hacky" timeout... ^^'

If someone has a nicer implementation to share, he's more than welcome ! :)

🔹 ScrollView
        ✅ Renders all items at once → good for small lists
        ✅ Simple to use — just put your items inside
        ✅ Supports scrolling in one direction (vertical or horizontal)

⚠️ Not memory-efficient for large lists → can slow down your app

Example:
<ScrollView>
  {items.map(item => <Text>{item}</Text>)}
</ScrollView>

🔹 FlatList
        ✅ Renders items lazily / on demand (only what's visible + a bit more)
        ✅ Better for large lists → more efficient memory and performance
        ✅ Has built-in props like keyExtractor, ItemSeparatorComponent, onEndReached, etc.

⚠️ Slightly more setup needed than ScrollView

Example:

<FlatList
  data={items}
  keyExtractor={item => item.id}
  renderItem={({ item }) => <Text>{item.name}</Text>}
/>


===================================================================

Pressable Vs Touchable 

🔹 TouchableOpacity
✅ Built-in React Native component
✅ Changes the opacity (fades out) of the view when pressed
✅ Simple to use for basic button-like interactions

⚠️ Limited flexibility — only opacity feedback

<TouchableOpacity onPress={() => console.log('Pressed')}>
  <Text>Click Me</Text>
</TouchableOpacity>


🔹 Pressable
✅ Newer and more powerful than TouchableOpacity
✅ Gives full control over press states (e.g. pressed, hovered, focused)
✅ You can change style, color, scale, shadow, etc. on press
✅ Supports complex gestures (long press, onPressIn, onPressOut)

Example:

<Pressable
  onPress={() => console.log('Pressed')}
  style={({ pressed }) => ({
    backgroundColor: pressed ? 'lightgray' : 'white'
  })}
>
  <Text>Click Me</Text>
</Pressable>